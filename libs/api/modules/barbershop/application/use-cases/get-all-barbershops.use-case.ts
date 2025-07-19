import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllBarbershopsQuery } from '../queries/get-all-barbershops.query';
import { BarbershopMapper, BarbershopRepository } from '@barbershop-app/api/barbershop/domain';


@QueryHandler(GetAllBarbershopsQuery)
export class GetAllBarbershopsUseCase implements IQueryHandler<GetAllBarbershopsQuery> {
  constructor(private readonly barbershopRepo: BarbershopRepository) {}

  async execute() {
    const barbershops = await this.barbershopRepo.getAll();
    return barbershops.map(barbershop => BarbershopMapper.toDto(barbershop));
  }
}
