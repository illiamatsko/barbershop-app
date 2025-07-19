import { JwtPayload } from '@barbershop-app/api/shared/auth';

export abstract class AuthTokenGenerator {
  abstract sign(payload: JwtPayload): string;
}
