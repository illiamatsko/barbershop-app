import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Service } from '@prisma/client';
import { ServiceRepository } from '@barbershop-app/core/domain';

@Injectable()
export class PrismaServiceRepository implements ServiceRepository{
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Service[]> {
    return this.prisma.service.findMany();
  }

  async getById(id: number): Promise<Service | null> {
    return this.prisma.service.findUnique({
      where: {
        id,
      },
    });
  }
}
