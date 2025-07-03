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
  const barberStatuses = await Promise.all(
    seedData.barberStatuses.map(
      (status: { name: string; description: string }) =>
        prisma.barberStatus.create({
          data: {
            description: status.description,
          },
        })
    )
  );

  // 2. Create Services
  const services = await Promise.all(
    seedData.services.map((service: { name: string; duration: number }) =>
      prisma.service.create({
        data: {
          name: service.name,
          duration: service.duration,
        },
      })
    )
  );

  // 3. Create Users
  const userPassword = await hashPassword('client@example.com');
  const barberPassword = await hashPassword('barber-old@example.com');

  const user = await prisma.user.create({
    data: {
      email: 'client@example.com',
      firstName: 'Client',
      lastName: 'Test',
      phoneNumber: '0987654321',
      password: userPassword,
      role: 'CLIENT',
    },
  });

  const barbershop = await prisma.barbershop.create({
    data: {
      name: 'Barbershop',
      address: 'Main Street 123',
      phoneNumber: '+380931234567',
    },
  });

  const status =
    barberStatuses.find((s) => s.description.includes('SENIOR_BARBER')) ||
    barberStatuses[0];

  const barber = await prisma.barber.create({
    data: {
      email: 'barber-old@example.com',
      firstName: 'Barber',
      lastName: 'Test',
      phoneNumber: '+380931112233',
      password: barberPassword,
      role: 'BARBER',
      barbershopId: barbershop.id,
      statusId: status.id,
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
      userEmail: user.email,
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
