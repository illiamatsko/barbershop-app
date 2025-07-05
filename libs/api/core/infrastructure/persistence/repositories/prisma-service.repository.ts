import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ServiceRepository } from '@barbershop-app/api/core/domain';
import { ServiceEntity } from '@barbershop-app/api/core/domain';
import { ServiceToDomainEntity } from './mappers/service.mapper';


@Injectable()
export class PrismaServiceRepository implements ServiceRepository{
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<ServiceEntity[]> {
    const services = await this.prisma.service.findMany();

    const serviceEntities = [];
    for(const service of services) {
      serviceEntities.push(ServiceToDomainEntity(service));
    }

    return serviceEntities;
  }

  async getById(id: number): Promise<ServiceEntity | null> {
    return ServiceToDomainEntity(
      await this.prisma.service.findUnique({
      where: {
        id,
      },
    }));
  }
}
