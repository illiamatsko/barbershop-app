import { Injectable } from '@nestjs/common';
import { Service } from '@prisma/client';
import { BarberRepository, ServiceRepository } from '@barbershop-app/core/domain';

@Injectable()
export class GetBarberServicesUseCase {
  constructor(
    private readonly barberRepo: BarberRepository,
    private readonly serviceRepo: ServiceRepository
  ) {}

  async execute(barberId: number): Promise<Service[]> {
    const barberServices = await this.barberRepo.getServicesByBarberId(barberId);

    const services = [];
    for (const obj of barberServices) {
      const service = await this.serviceRepo.getById(obj.serviceId);
      if (service) services.push(service);
    }

    return services;
  }
}
