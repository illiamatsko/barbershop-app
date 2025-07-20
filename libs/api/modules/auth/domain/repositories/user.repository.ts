import { CreateUserDto } from '../dtos/create-user.dto';
import { UserEntity } from '../entities/user.entity';

export abstract class UserRepository {
  abstract create(createUserDto: CreateUserDto): Promise<UserEntity>

  abstract findUserByEmail(email: string): Promise<UserEntity | null>;
}
