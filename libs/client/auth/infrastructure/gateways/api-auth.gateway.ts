import { SignInUserDto, SignUpUserDto, UserDto } from '@barbershop-app/shared/types';
import { inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@barbershop-app/shared/env';
import { AuthGateway } from '@barbershop-app/client/auth/domain';
import { authState } from '@barbershop-app/client/core/application';


export class ApiAuthGateway implements AuthGateway {
  private httpClient = inject(HttpClient);
  private API_URL = environment.apiUrl;

  error = signal('');

  SignIn(signInUserDto: SignInUserDto) {
    return this.httpClient.post<authState>(`${this.API_URL}/auth/sign-in`, signInUserDto);
  }

  SignUp(user: SignUpUserDto) {
    return this.httpClient.post<authState>(`${this.API_URL}/auth/sign-up`, user);
  }

  GetUserFromToken(token: string, headers: { Authorization: string }) {
    return this.httpClient.get<UserDto>(`${this.API_URL}/auth/me`, { headers });
  }
}
