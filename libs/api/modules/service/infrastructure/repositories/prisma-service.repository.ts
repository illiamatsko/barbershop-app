import { Injectable } from '@nestjs/common';
import { ServiceMapper } from '../mappers/service.mapper';
import { PrismaService } from '@barbershop-app/api/core/persistence';
import { ServiceEntity, ServiceRepository } from '@barbershop-app/api/service/domain';
import { Service, ServicePrice } from '@prisma/client';


@Injectable()
export class PrismaServiceRepository implements ServiceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<ServiceEntity[]> {
    const services = await this.prisma.service.findMany({
      include: {
        servicePrice: true,
      },
    });
    return services.map(this.mapServiceWithPrices);
  }

  async getServicesByBarberId(id: number): Promise<ServiceEntity[]> {
    const barberServices = await this.prisma.barberService.findMany({
      where: {
        barberId: id,
      },
      include: {
        service: {
          include: {
            servicePrice: true
          }
        }
      }
    });

    return barberServices.map(bs => this.mapServiceWithPrices(bs.service));
  }

  private mapServiceWithPrices(service: Service & { servicePrice: ServicePrice[] }): ServiceEntity {
    const prices = service.servicePrice.map(sp => sp.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return ServiceMapper.toEntity({
      ...service,
      minPrice,
      maxPrice,
    });
  }
}
