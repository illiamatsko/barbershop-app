import { Injectable } from '@nestjs/common';
import { PrismaService } from '@barbershop-app/prisma';

@Injectable()
export class ServiceRepository {
  constructor(private prisma: PrismaService) {}

  async getById(id: number) {
    return this.prisma.service.findUnique({
      where: {
        id
      }
    })
  }
}
