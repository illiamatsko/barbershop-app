import { Injectable } from '@nestjs/common';
import { ServiceRepository, ServiceEntity } from '@barbershop-app/api/core/domain';


@Injectable()
export class GetAllServicesUseCase {
  constructor(private readonly serviceRepo: ServiceRepository) {}

  async execute(): Promise<ServiceEntity[]> {
    return this.serviceRepo.getAll();
  }
}
