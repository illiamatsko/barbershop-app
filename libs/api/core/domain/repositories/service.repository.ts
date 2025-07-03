import { Service } from '@prisma/client';

export abstract class ServiceRepository {
  abstract getAll(): Promise<Service[]>

  abstract getById(id: number): Promise<Service | null>
}
