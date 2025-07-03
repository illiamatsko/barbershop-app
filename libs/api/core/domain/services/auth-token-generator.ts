import { JwtPayload } from '@barbershop-app/types';

export abstract class AuthTokenGenerator {
  abstract sign(payload: JwtPayload): Promise<string>;
}
