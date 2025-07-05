import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PasswordRepository } from '@barbershop-app/api/core/domain';


@Injectable()
export class PrismaPasswordRepository implements PasswordRepository {
  constructor(private prisma: PrismaService) {}

  async getHashedPasswordByUserEmail(email: string): Promise<string | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: { password: true }
    });

    return user ? user.password : null;
  }
}
