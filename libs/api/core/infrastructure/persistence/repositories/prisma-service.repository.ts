import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ServiceRepository } from '@barbershop-app/api/core/domain';
import { ServiceEntity } from '@barbershop-app/api/core/domain';
import { ServiceMapper } from './mappers/service.mapper';


@Injectable()
export class PrismaServiceRepository implements ServiceRepository{
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<ServiceEntity[]> {
    const services = await this.prisma.service.findMany({
      include: { servicePrice: true }
    });

    const enrichedServices = services.map(service => {
      const prices = service.servicePrice.map(p => p.price);
      return {
        ...service,
        minPrice: Math.min(...prices),
        maxPrice: Math.max(...prices),
      };
    });

    const serviceEntities = [];
    for(const service of enrichedServices) {
      serviceEntities.push(ServiceMapper.toDomain(service));
    }

    return serviceEntities;
  }

  async getById(id: number): Promise<ServiceEntity | null> {
    const service = await this.prisma.service.findUnique({
      include: { servicePrice: true },
      where: { id },
    });

    if(!service) return null;

    const prices = service.servicePrice.map(p => p.price);
    const enrichedService = {
      ...service,
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices)
    };

    return ServiceMapper.toDomain(enrichedService);
  }
}
