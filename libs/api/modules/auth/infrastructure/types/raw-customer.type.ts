import { Prisma } from '@prisma/client';

export type RawCustomerType = Prisma.UserGetPayload<{
  include: {
    customer: true
  }
}>
