import { Request } from 'express';
import { CustomerEntity } from '../entities/customer.entity';
import { BarberFullEntity } from '../entities/barber-full.entity';

export interface AuthRequest extends Request {
  user: CustomerEntity | BarberFullEntity
}
