import { Prisma } from '@prisma/client';

export type RawBarberType = Prisma.UserGetPayload<{
  include: {
    barber: {
      include: {
        status: true;
        barbershop: true;
        reviews: true;
      };
    };
  };
}>;
