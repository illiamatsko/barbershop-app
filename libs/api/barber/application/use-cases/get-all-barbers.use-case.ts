import { Injectable } from '@nestjs/common';
import { BarberRepository } from '@barbershop-app/core/domain';
import { BarberEntity } from '@barbershop-app/core/domain';

@Injectable()
export class GetAllBarbersUseCase {
  constructor(private readonly barberRepo: BarberRepository) {}

  async execute(): Promise<BarberEntity[]> {
    return this.barberRepo.getAll();
  }
}
