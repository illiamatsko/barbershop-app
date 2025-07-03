import { Injectable } from '@nestjs/common';
import { ServiceRepository } from '@barbershop-app/core/domain';

@Injectable()
export class GetAllServicesUseCase {
  constructor(private readonly serviceRepo: ServiceRepository) {}

  async execute() {
    return this.serviceRepo.getAll();
  }
}
