import { UserRepository } from '@barbershop-app/api/auth/domain';
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

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email }
    });

    return user ? UserMapper.toEntity(user) : null
  }
}
