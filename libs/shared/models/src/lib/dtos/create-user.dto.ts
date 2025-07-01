import { BaseUser } from '../interfaces/base-user.interface';

export interface CreateUserDto extends BaseUser {
  password: string
}
