import { CustomerEntity } from '../entities/customer.entity';
import { BarberFullEntity } from '../entities/barber-full.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserEntity } from '../entities/user.entity';

export abstract class UserRepository {
  abstract create(createUserDto: CreateUserDto): Promise<UserEntity>

  abstract findByEmail(email: string): Promise<CustomerEntity | BarberFullEntity | null>;
}
