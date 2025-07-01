import { BaseUser } from './base-user.interface';

export interface JwtPayload extends BaseUser {
  id: number,
  role: string,
  createdAt: string
}
