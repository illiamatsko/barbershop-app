import { BarbershopEntity } from '../entities/barbershop.entity';

export abstract class BarbershopRepository {
  abstract getAll(): Promise<BarbershopEntity[]>
}
