import { Request } from 'express';
import { UserDto } from '@barbershop-app/shared/types';

export interface AuthRequest extends Request {
  user: UserDto
}
