import { JwtPayload } from '@barbershop-app/shared/types';

export abstract class AuthTokenGenerator {
  abstract sign(payload: JwtPayload): string;
}
