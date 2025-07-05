import { Injectable } from '@nestjs/common';
import { BarberRepository } from '@barbershop-app/api/core/domain';
import { BarberEntity } from '@barbershop-app/api/core/domain';

@Injectable()
export class GetAllBarbersUseCase {
  constructor(private readonly barberRepo: BarberRepository) {}

  async execute(): Promise<BarberEntity[]> {
    return this.barberRepo.getAll();
  }
}
