import { PrismaClient } from '@prisma/client';
import { CreateAppointmentPayload } from '@barbershop-app/shared/domain';
import { BadRequestException } from '@nestjs/common';

export async function validateAppointment(
  prisma: PrismaClient,
  payload: CreateAppointmentPayload
) {
  const barberUser = await prisma.user.findFirst({
    where: { id: payload.barberId },
    include: {
      barber: { include: { barbershop: true } }
    }
  });

  const service = await prisma.service.findFirst({
    where: { id: payload.serviceId }
  });

  if (!barberUser || !barberUser.barber || !service) {
    throw new BadRequestException('Error creating appointment');
  }

  const barberServices = await prisma.barberService.findMany({
    where: { barberId: payload.barberId },
    select: { serviceId: true }
  }).then(s => s.map(x => x.serviceId));

  if (!barberServices.includes(payload.serviceId)) {
    throw new BadRequestException('Error creating appointment');
  }

  const appointmentStartTime = new Date(payload.date);
  const appointmentEndTime = new Date(appointmentStartTime);
  appointmentEndTime.setTime(appointmentEndTime.getTime() + service.duration * 60 * 1000);

  const timeSlots = await prisma.timeSlot.findMany({
    where: {
      barberId: payload.barberId,
      status: 'AVAILABLE',
      startTime: { gte: appointmentStartTime, lte: appointmentEndTime }
    },
    orderBy: { startTime: 'asc' }
  });

  if (timeSlots.length < service.duration / 30) {
    throw new BadRequestException('Error creating appointment');
  }

  return {
    appointmentSlots: timeSlots,
    barbershopId: barberUser.barber.barbershop.id
  };
}
