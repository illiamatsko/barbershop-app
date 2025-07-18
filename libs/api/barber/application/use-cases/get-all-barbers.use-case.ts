import { BarberMapper, BarberRepository } from '@barbershop-app/api/core/domain';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllBarbersQuery } from '../queries/get-all-barbers.query';
import { BarberSummaryDto } from '@barbershop-app/shared/types';

@QueryHandler(GetAllBarbersQuery)
export class GetAllBarbersUseCase implements IQueryHandler<GetAllBarbersQuery> {
  constructor(private readonly barberRepo: BarberRepository) {}

  async execute(): Promise<BarberSummaryDto[]>  {
    const barberEntities = await this.barberRepo.getAll();

    const barberDtos = [];
    for(const barberEntity of barberEntities) {
      barberDtos.push(BarberMapper.toSummaryDto(barberEntity));
    }

    return barberDtos;
  }
}
