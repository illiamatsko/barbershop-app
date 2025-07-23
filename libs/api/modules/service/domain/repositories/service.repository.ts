import { ServiceEntity } from '../entities/service.entity';

export abstract class ServiceRepository {
  abstract getAll(): Promise<ServiceEntity[]>

  abstract getServiceIdsByBarberId(id: number): Promise<number[]>
}
