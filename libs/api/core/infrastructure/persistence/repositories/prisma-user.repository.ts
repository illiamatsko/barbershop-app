import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepository } from '@barbershop-app/core/domain';
import { UserMapper } from './mappers/user.mapper';
import { JwtPayload } from '@barbershop-app/types';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: Prisma.UserCreateInput): Promise<JwtPayload> {
    return UserMapper.UserToJwtPayload(await this.prisma.user.create({ data: createUserDto }));
  }

  async findByEmail(email: string): Promise<JwtPayload | null> {
    const user = await this.prisma.user.findUnique({
      where: { email }
    });
    if(!user) return null;

    return UserMapper.UserToJwtPayload(user);
  }
}
