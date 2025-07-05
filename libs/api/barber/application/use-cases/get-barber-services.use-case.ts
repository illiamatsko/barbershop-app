import { Injectable } from '@nestjs/common';
import { BarberRepository, ServiceRepository } from '@barbershop-app/api/core/domain';
import { ServiceEntity } from '@barbershop-app/api/core/domain';

@Injectable()
export class GetBarberServicesUseCase {
  constructor(
    private readonly barberRepo: BarberRepository,
    private readonly serviceRepo: ServiceRepository
  ) {}

  async execute(barberId: number): Promise<ServiceEntity[]> {
    const barberServices = await this.barberRepo.getServicesByBarberId(barberId);

    const services: ServiceEntity[] = [];
    for (const { serviceId } of barberServices) {
      const service = await this.serviceRepo.getById(serviceId);
      if (service) services.push(service);
    }

    return services;
  }
}
