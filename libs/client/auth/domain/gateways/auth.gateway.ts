import { UserDto } from '@barbershop-app/shared/types';
import { Observable } from 'rxjs';
import { AuthState } from '@barbershop-app/client/core/application';
import { SignInDto } from '../dtos/sign-in.dto';
import { SignUpDto } from '../dtos/sign-up.dto';

export abstract class AuthGateway {
  abstract SignIn(user: SignInDto): Observable<AuthState>;

  abstract SignUp(user: SignUpDto): Observable<AuthState>;

  abstract GetUserFromToken(token: string, headers: { Authorization: string }): Observable<UserDto>;
}
