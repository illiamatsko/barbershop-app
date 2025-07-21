import { PrismaClient } from '@prisma/client';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import * as fs from 'fs/promises';
import * as path from 'path';

const prisma = new PrismaClient();
const scrypt = promisify(_scrypt);

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(8).toString('hex');
  const hash = (await scrypt(password, salt, 32)) as Buffer;
  return `${salt}.${hash.toString('hex')}`;
}

function getTomorrowSlots(): Date[] {
  const slots: Date[] = [];
  const start = new Date();
  start.setDate(start.getDate() + 1);
  start.setHours(9, 0, 0, 0);

  const end = new Date(start);
  end.setHours(18, 0, 0, 0);

  while (start < end) {
    slots.push(new Date(start));
    start.setMinutes(start.getMinutes() + 30);
  }

  return slots;
}

async function main() {
  const filePath = path.join(__dirname, 'seed-data.json');
  const fileData = await fs.readFile(filePath, 'utf-8');
  const seedData = JSON.parse(fileData);

  // 1. Create BarberStatuses
  const barberStatuses = [];
  for (const status of seedData.barberStatuses) {
    barberStatuses.push( await prisma.barberStatus.create({
      data: {
        name: status.name,
        alias: status.alias,
        description: status.description,
      },
    }));
  }

  // 2. Create Services
  const services = [];
  for (const service of seedData.services) {
    services.push( await prisma.service.create({
      data: {
        name: service.name,
        duration: service.duration,
        description: service.description,
        isMain: service.isMain,
      },
    }));
  }

  // 3. Create Users
  const customerPassword = await hashPassword('customer@example.com');
  const barberPassword = await hashPassword('barber-old@example.com');
  const managerPassword = await hashPassword('manager@example.com');

  const customerUser = await prisma.user.create({
    data: {
      email: 'customer@example.com',
      password: customerPassword,
      firstName: 'Customer',
      lastName: 'Smith',
      phoneNumber: '1122334455',
      role: 'CUSTOMER',
    },
  });

  const customer = await prisma.customer.create({
    data: {
      userId: customerUser.id,
    },
  });

  const managerUser = await prisma.user.create({
    data: {
      email: 'manager@example.com',
      password: managerPassword,
      firstName: 'Manager',
      lastName: 'Doe',
      phoneNumber: '9988776655',
      role: 'MANAGER',
    },
  });

  const manager = await prisma.manager.create({
    data: {
      userId: managerUser.id,
    },
  });

  const barbershop = await prisma.barbershop.create({
    data: {
      name: 'Barbershop',
      address: 'Main Street 123',
      phoneNumber: '+380931234567',
      managerId: manager.id
    },
  });

  const status = barberStatuses[3];

  const barberUser = await prisma.user.create({
    data: {
      email: 'barber@example.com',
      password: barberPassword,
      firstName: 'Barber',
      lastName: 'Johnson',
      phoneNumber: '1234567890',
      role: 'BARBER',
    },
  });

  const barber = await prisma.barber.create({
    data: {
      userId: barberUser.id,
      photoUrl: 'https://res.cloudinary.com/dx7xjflm0/image/upload/f_auto,q_90,w_500,h_500,c_fill,g_face,dpr_auto/v1753095264/barber_19_frilfd.avif',
      experience: 96,
      barbershopId: barbershop.id,
      statusId: status.id,
    },
  });

  await prisma.review.create({
    data: {
      content: 'Very professional and friendly!',
      starRating: 5,
      barberId: barber.id,
      customerId: customer.id
    },
  });

  // 4. Connect Barber to Services
  for (const service of services) {
    await prisma.barberService.create({
      data: {
        barberId: barber.id,
        serviceId: service.id,
      },
    });
  }

  // 5. Add Service Prices
  await prisma.servicePrice.createMany({
    data: seedData.servicesPrices.map(
      (sp: { serviceId: number; barberStatusId: number; price: number }) => ({
        serviceId: sp.serviceId,
        barberStatusId: sp.barberStatusId,
        price: sp.price,
      })
    ),
  });

  // 6. Create Appointment for the first service
  const selectedService = services[0];
  const appointment = await prisma.appointment.create({
    data: {
      status: 'CONFIRMED',
      comment: '',
      customerId: customer.id,
      barberId: barber.id,
      serviceId: selectedService.id,
    },
  });

  // 7. Create TimeSlots
  const slotTimes = getTomorrowSlots();
  const slotDuration = 30;
  const slotsRequired = selectedService.duration / slotDuration;
  const appointmentSlots = slotTimes.slice(0, slotsRequired);

  await Promise.all(
    slotTimes.map((time) => {
      const isBooked = appointmentSlots.some(
        (appointmentTime) => appointmentTime.getTime() === time.getTime()
      );

      return prisma.timeSlot.create({
        data: {
          startTime: time,
          barberId: barber.id,
          status: isBooked ? 'BOOKED' : 'AVAILABLE',
          appointmentId: isBooked ? appointment.id : null,
        },
      });
    })
  );
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error('Seed error:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
