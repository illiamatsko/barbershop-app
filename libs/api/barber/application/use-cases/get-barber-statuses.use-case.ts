import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetBarberStatusesQuery } from '../queries/get-barber-statuses.query';
import { BarberRepository, BarberStatusMapper } from '@barbershop-app/api/core/domain';
import { BarberStatusDto } from '@barbershop-app/shared/types';

@QueryHandler(GetBarberStatusesQuery)
export class GetBarberStatusesUseCase implements IQueryHandler<GetBarberStatusesQuery> {
  constructor(private barberRepo: BarberRepository) {}

  async execute(): Promise<BarberStatusDto[]> {
    const barberStatusEntities = await this.barberRepo.getBarberStatuses();

    const barberStatusDtos = [];
    for(const barberStatus of barberStatusEntities) {
      barberStatusDtos.push(BarberStatusMapper.toDto(barberStatus));
    }

    return barberStatusDtos;
  }
}
