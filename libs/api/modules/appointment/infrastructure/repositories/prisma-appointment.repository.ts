import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@barbershop-app/api/core/persistence';
import { CreateAppointmentPayload } from '@barbershop-app/shared/domain';
import { AppointmentRepository } from '@barbershop-app/api/appointment/domain';
import { AppointmentMapper } from '../mappers/appointment.mapper';
import { validateAppointment, } from '../validators/appointment.validator';
import { RawAppointmentType } from '../types/raw-appointment.type';
import { AppointmentStatus } from '@prisma/client';

@Injectable()
export class PrismaAppointmentRepository implements AppointmentRepository {
  constructor(private prisma: PrismaService) {}

  async create(createAppointmentPayload: CreateAppointmentPayload) {
    const { appointmentSlots, barbershopId } = await validateAppointment(
      this.prisma,
      createAppointmentPayload
    );

    const [appointment] = await this.prisma.$transaction(async (tx) => {
      const appointment = await tx.appointment.create({
        data: {
          ...createAppointmentPayload,
          date: appointmentSlots[0].startTime,
        },
      });

      await tx.timeSlot.updateMany({
        where: {
          id: { in: appointmentSlots.map((slot) => slot.id) },
        },
        data: {
          status: 'BOOKED',
          appointmentId: appointment.id,
        },
      });

      return [appointment];
    });

    return AppointmentMapper.toEntity(
      appointment,
      appointmentSlots[0].startTime,
      createAppointmentPayload.email,
      createAppointmentPayload.customerId,
      barbershopId
    );
  }

  async getCustomerAppointmentsInfo(customerId: number) {
    const appointments = await this.prisma.appointment.findMany({
      where: {
        customerId,
      },
      include: {
        barber: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          }
        },
        service: {
          select: {
            name: true,
          },
        },
      },
    });

    const appointmentsInfo: RawAppointmentType[] = await Promise.all(
      appointments.map(async (appointment) => {
        const price = await this.prisma.servicePrice
          .findFirst({
            where: {
              serviceId: appointment.serviceId,
              barberStatusId: appointment.barber.statusId,
            },
            select: {
              price: true,
            },
          })
          .then((p) => p?.price ?? 0);

        return { ...appointment, price };
      })
    );

    return appointmentsInfo.map((appointmentsInfo) =>
      AppointmentMapper.toInfoEntity(appointmentsInfo)
    );
  }

  async cancelAppointment(appointmentId: number): Promise<boolean> {
    const appointment = await this.prisma.appointment.findFirst({
      where: {
        id: appointmentId,
      },
      include: {
        timeSlot: {
          select: {
            id: true,
          }
        }
      }
    });

    if (!appointment) return true;

    try {
      await this.prisma.$transaction(async (tx) => {
        await tx.appointment.update({
          where: { id: appointmentId },
          data: { status: AppointmentStatus.CANCELED },
        });

        await tx.timeSlot.updateMany({
          where: {
            id: { in: appointment.timeSlot.map((slot) => slot.id) },
          },
          data: {
            status: 'AVAILABLE',
            appointmentId: null,
          },
        });
      });

      return true;
    } catch {
      throw new BadRequestException('Error canceling appointment');
    }
  }
}
