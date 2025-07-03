import { JwtPayload } from './jwt-payload.interface';

export interface AuthResult {
  payload: JwtPayload;
  token: string;
}
