import { PrismaClient } from '@prisma/client';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

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
  const userPassword = await hashPassword('client@example.com');
  const barberPassword = await hashPassword('barber@example.com');

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

  const barber = await prisma.barber.create({
    data: {
      email: 'barber@example.com',
      firstName: 'Barber',
      lastName: 'Test',
      phoneNumber: '+380931112233',
      password: barberPassword,
      role: 'BARBER',
      status: 'SENIOR_BARBER',
      barbershopId: barbershop.id,
    },
  });

  const service = await prisma.service.create({
    data: {
      name: 'Individual Haircut',
      duration: 60,
      barberId: barber.id,
    },
  });

  await prisma.servicePrice.createMany({
    data: [
      {
        serviceId: service.id,
        barberStatus: 'BARBER',
        price: 550,
      },
      {
        serviceId: service.id,
        barberStatus: 'SENIOR_BARBER',
        price: 650,
      },
    ],
  });

  const slotTimes = getTomorrowSlots();
  const slotDuration = 30;
  const slotsRequired = service.duration / slotDuration;
  const appointmentSlots = slotTimes.slice(0, slotsRequired);

  const appointment = await prisma.appointment.create({
    data: {
      status: 'CONFIRMED',
      userEmail: user.email,
      barberId: barber.id,
      serviceId: service.id,
    },
  });

  await Promise.all(
    slotTimes.map(async (time) => {
      const isBooked = appointmentSlots.some(
        (appointmentTime) => appointmentTime.getTime() === time.getTime()
      );

      await prisma.timeSlot.create({
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
