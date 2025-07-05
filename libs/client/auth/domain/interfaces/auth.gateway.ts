import { SignInUserDto, SignUpUserDto, UserDto } from '@barbershop-app/shared/types';
import { Observable } from 'rxjs';
import { authState } from '@barbershop-app/client/core/application';

export abstract class AuthGateway {
  abstract SignIn(user: SignInUserDto): Observable<authState>;

  abstract SignUp(user: SignUpUserDto): Observable<authState>;

  abstract GetUserFromToken(token: string, headers: { Authorization: string }): Observable<UserDto>;
}
