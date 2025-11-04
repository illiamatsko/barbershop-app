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

function getSlotsForDays(daysAhead: number, startHour = 9, endHour = 18, stepMinutes = 30): Date[] {
  const slots: Date[] = [];
  const now = new Date();

  for (let day = 0; day < daysAhead; day++) {
    const start = new Date(now);
    start.setDate(start.getDate() + day);
    start.setHours(startHour, 0, 0, 0);

    const end = new Date(start);
    end.setHours(endHour, 0, 0, 0);

    const cursor = new Date(start);
    while (cursor < end) {
      slots.push(new Date(cursor));
      cursor.setMinutes(cursor.getMinutes() + stepMinutes);
    }
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

  const managerUser1 = await prisma.user.create({
    data: {
      email: 'manager1@example.com',
      password: managerPassword,
      firstName: 'Manager1',
      lastName: 'Doe1',
      phoneNumber: '9988776651',
      role: 'MANAGER',
    },
  });

  const manager1 = await prisma.manager.create({
    data: {
      userId: managerUser1.id,
    },
  });

  const managerUser2 = await prisma.user.create({
    data: {
      email: 'manager2@example.com',
      password: managerPassword,
      firstName: 'Manager2',
      lastName: 'Doe2',
      phoneNumber: '9988776652',
      role: 'MANAGER',
    },
  });

  const manager2 = await prisma.manager.create({
    data: {
      userId: managerUser2.id,
    },
  });

  const barbershop1 = await prisma.barbershop.create({
    data: {
      name: 'Barbershop1',
      address: 'Main Street 1',
      phoneNumber: '0931234561',
      managerId: managerUser1.id
    },
  });

  const barbershop2 = await prisma.barbershop.create({
    data: {
      name: 'Barbershop2',
      address: 'Main Street 2',
      phoneNumber: '0931234562',
      managerId: managerUser2.id
    },
  });

  const status = barberStatuses[3];

  const barberUser1 = await prisma.user.create({
    data: {
      email: 'barber1@example.com',
      password: barberPassword,
      firstName: 'Barber1',
      lastName: 'Johnson1',
      phoneNumber: '1234567891',
      role: 'BARBER',
    },
  });

  const barber1 = await prisma.barber.create({
    data: {
      userId: barberUser1.id,
      photoUrl: 'https://res.cloudinary.com/dx7xjflm0/image/upload/f_auto,q_90,w_500,h_500,c_fill,g_face,dpr_auto/v1753095264/barber_19_frilfd.avif',
      experience: 96,
      barbershopId: barbershop1.id,
      statusId: status.id,
    },
  });

  const barberUser2 = await prisma.user.create({
    data: {
      email: 'barber2@example.com',
      password: barberPassword,
      firstName: 'Barber2',
      lastName: 'Johnson2',
      phoneNumber: '1234567892',
      role: 'BARBER',
    },
  });

  const barber2 = await prisma.barber.create({
    data: {
      userId: barberUser2.id,
      photoUrl: 'https://res.cloudinary.com/dx7xjflm0/image/upload/f_auto,q_90,w_500,h_500,c_fill,g_face,dpr_auto/v1753095264/barber_19_frilfd.avif',
      experience: 96,
      barbershopId: barbershop2.id,
      statusId: status.id,
    },
  });

  await prisma.review.create({
    data: {
      content: 'Very professional and friendly!',
      starRating: 5,
      barberId: barberUser1.id,
      customerId: customerUser.id
    },
  });

  // 4. Connect Barber to Services
  for (let i=0; i<services.length; i+=2) {
    await prisma.barberService.create({
      data: {
        barberId: barberUser1.id,
        serviceId: services[i].id,
      },
    });
  }
  for (let i= 1; i+1<services.length; i+=2) {
    await prisma.barberService.create({
      data: {
        barberId: barberUser2.id,
        serviceId: services[i].id,
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
      customerId: customerUser.id,
      email: customerUser.email,
      barberId: barberUser1.id,
      serviceId: selectedService.id,
    },
  });

  // 7. Create TimeSlots for all barbers on 7 days ahead
  const allBarbers = [barber1, barber2]; // або await prisma.barber.findMany()

  const slotTimes = getSlotsForDays(7); // 7 днів вперед

  for (const barber of allBarbers) {
    await Promise.all(
      slotTimes.map((time, idx) => {
        const isBooked = idx % 2 === 0;

        return prisma.timeSlot.create({
          data: {
            startTime: time,
            barberId: barber.userId,
            status: isBooked ? 'BOOKED' : 'AVAILABLE',
            appointmentId: isBooked ? appointment.id : null,
          },
        });
      })
    );
  }
  // const allBarbers = [barber1, barber2];
  // const slotTimes = getSlotsForDays(7); // 7 днів вперед
  //
  // for (const barber of allBarbers) {
  //   await Promise.all(
  //     slotTimes.map((time, idx) => {
  //       // визначаємо, до якого дня належить слот
  //       const slotDate = new Date(time);
  //       const dayIndex = Math.floor(
  //         (slotDate.getTime() - slotTimes[0].getTime()) / (1000 * 60 * 60 * 24)
  //       );
  //
  //       const slotsPerDay = (9 * 60) / 30;
  //       const indexWithinDay = idx % slotsPerDay;
  //
  //       const startAvailableIndex = dayIndex * 2;
  //       const endAvailableIndex = startAvailableIndex + 2;
  //
  //       const isAvailable =
  //         indexWithinDay >= startAvailableIndex &&
  //         indexWithinDay < endAvailableIndex;
  //
  //       return prisma.timeSlot.create({
  //         data: {
  //           startTime: time,
  //           barberId: barber.userId,
  //           status: isAvailable ? 'AVAILABLE' : 'BOOKED',
  //           appointmentId: isAvailable ? null : appointment.id,
  //         },
  //       });
  //     })
  //   );
  // }

}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error('Seed error:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
