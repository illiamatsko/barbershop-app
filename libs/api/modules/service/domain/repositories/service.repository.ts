import { ServiceEntity } from '../entities/service.entity';

export abstract class ServiceRepository {
  abstract getAll(): Promise<ServiceEntity[]>

  abstract getServiceIdsByBarberId(id: number): Promise<number[]>

  abstract getPricesByBarberStatus(status: string): Promise<{serviceId: number, price: number}[]>
}
