import { BarberEntity } from '../entities/barber.entity';
import { CustomerEntity } from '../entities/customer.entity';

export abstract class UserRepository {
  abstract findByEmail(
    email: string
  ): Promise<CustomerEntity | BarberEntity | null>;
}
