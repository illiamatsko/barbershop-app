import { ServiceEntity } from '../entities/service.entity';

export abstract class ServiceRepository {
  abstract getAll(): Promise<ServiceEntity[]>

  abstract getServicesByBarberId(id: number): Promise<ServiceEntity[]>
}
