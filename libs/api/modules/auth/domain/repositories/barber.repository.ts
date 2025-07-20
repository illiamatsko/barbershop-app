import { BarberFullEntity } from '../entities/barber-full.entity';
import { CreateBarberRecordDto } from '../dtos/create-barber-record.dto';

export abstract class BarberRepository {
  abstract createBarber(createBarberRecordDto: CreateBarberRecordDto): Promise<BarberFullEntity>

  abstract getByEmail(email: string): Promise<BarberFullEntity | null>
}
