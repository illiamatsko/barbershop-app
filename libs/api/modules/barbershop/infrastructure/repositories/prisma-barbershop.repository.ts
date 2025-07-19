import { BarbershopEntity, BarbershopRepository } from '@barbershop-app/api/barbershop/domain';
import { PrismaService } from '@barbershop-app/api/core/persistence';
import { BarbershopMapper } from '../mappers/barbershop.mapper';

export class PrismaBarbershopRepository implements BarbershopRepository {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<BarbershopEntity[]> {
    const barbershops = await this.prisma.barbershop.findMany();
    return barbershops.map(barbershop => BarbershopMapper.toEntity(barbershop));
  }
}
