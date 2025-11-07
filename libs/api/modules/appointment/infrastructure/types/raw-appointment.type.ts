import { Prisma } from '@prisma/client';


export type RawAppointmentType = Prisma.AppointmentGetPayload<{
  include: {
    barber: {
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      },
      select: {
        statusId: true
      }
    },
    service: {
      select: {
        name: true
      }
    },
  }
}> & {
  price: number
};
