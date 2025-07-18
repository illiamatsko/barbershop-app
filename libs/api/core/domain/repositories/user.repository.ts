import { CustomerEntity } from '../entities/customer.entity';
import { BarberFullEntity } from '../entities/barber-full.entity';

export abstract class UserRepository {
  abstract findByEmail(
    email: string
  ): Promise<CustomerEntity | BarberFullEntity | null>;
}
