import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepository } from '@barbershop-app/api/core/domain';
import { UserEntity } from '@barbershop-app/api/core/domain';
import { UserMapper } from './mappers/user.mapper';


@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: Prisma.UserCreateInput): Promise<UserEntity> {
    return UserMapper.toDomain(await this.prisma.user.create({ data: createUserDto }));
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email }
    });
    if(!user) return null;

    return UserMapper.toDomain(user);
  }

  async findByEmailOrPhone(email: string, phoneNumber: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { phoneNumber }
        ],
      },
    });
    if(!user) return null;

    return UserMapper.toDomain(user);
  }
}
