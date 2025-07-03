import { Injectable } from '@nestjs/common';
import { BarberRepository } from '@barbershop-app/core/domain';

@Injectable()
export class GetAllBarbersUseCase {
  constructor(private readonly barberRepo: BarberRepository) {}

  async execute() {
    return this.barberRepo.getAll();
  }
}
