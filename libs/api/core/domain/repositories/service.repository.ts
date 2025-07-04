import { ServiceEntity } from '../entities/service.entity';

export abstract class ServiceRepository {
  abstract getAll(): Promise<ServiceEntity[]>

  abstract getById(id: number): Promise<ServiceEntity | null>
}
