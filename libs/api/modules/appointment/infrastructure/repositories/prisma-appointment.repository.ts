import { Injectable } from '@nestjs/common';
import { PrismaService } from '@barbershop-app/api/core/persistence';
import { CreateAppointmentPayload } from '@barbershop-app/shared/domain';
import { AppointmentRepository } from '@barbershop-app/api/appointment/domain';
import { AppointmentMapper } from '../mappers/appointment.mapper';
import { validateAppointment, } from '../validators/appointment.validator';

@Injectable()
export class PrismaAppointmentRepository implements AppointmentRepository {
  constructor(private prisma: PrismaService) {}

  async create(createAppointmentPayload: CreateAppointmentPayload) {
    const { appointmentSlots, barbershopId } = await validateAppointment(this.prisma, createAppointmentPayload);

    const appointment = await this.prisma.appointment.create({
      data: { ...createAppointmentPayload, date: appointmentSlots[0].startTime },
    });

    await this.prisma.timeSlot.updateMany({
      where: {
        id: { in: appointmentSlots.map(slot => slot.id) }
      },
      data: {
        status: 'BOOKED',
        appointmentId: appointment.id
      }
    });

    return AppointmentMapper.toEntity(appointment, appointmentSlots[0].startTime, createAppointmentPayload.email, createAppointmentPayload.customerId, barbershopId);
  }
}
