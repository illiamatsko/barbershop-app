import { Request } from 'express';
import { JwtPayload } from '@barbershop-app/models';

export interface AuthRequest extends Request {
  user: JwtPayload
}
