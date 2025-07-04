import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepository } from '@barbershop-app/core/domain';
import { UserEntity } from '@barbershop-app/core/domain';
import { UserToDomainEntity } from './mappers/user.mapper';


@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: Prisma.UserCreateInput): Promise<UserEntity> {
    return UserToDomainEntity(await this.prisma.user.create({ data: createUserDto }));
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email }
    });
    if(!user) return null;

    return UserToDomainEntity(user);
  }
}
