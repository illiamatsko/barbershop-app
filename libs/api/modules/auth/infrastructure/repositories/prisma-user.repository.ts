import { BarberFullEntity, CustomerEntity, UserRepository } from '@barbershop-app/api/auth/domain';
import { BarberMapper } from '../mappers/barber.mapper';
import { CustomerMapper } from '../mappers/customer.mapper';
import { Injectable } from '@nestjs/common';
import { CreateUserDto, UserEntity } from '@barbershop-app/api/auth/domain';
import { UserMapper } from '../mappers/user.mapper';
import { PrismaService } from '@barbershop-app/api/core/persistence';


@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserPayload: CreateUserDto): Promise<UserEntity> {
    const user = await this.prisma.user.create({
      data: createUserPayload
    });

    return UserMapper.toEntity(user);
  }

  async findByEmail(email: string): Promise<CustomerEntity | BarberFullEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        barber: {
          include: {
            status: true,
            barbershop: true,
          },
        },
        customer: true,
      },
    });

    if (!user) return null;

    switch (user.role) {
      case 'CUSTOMER':
        return user.customer ? CustomerMapper.toEntity({ ...user, ...user.customer }) : null;

      case 'BARBER':
        return user.barber
          ? BarberMapper.toFullEntity(
            { ...user, ...user.barber },
            user.barber.status.name,
            user.barber.barbershop.address
          )
          : null;

      default:
        return null;
    }
  }
}
