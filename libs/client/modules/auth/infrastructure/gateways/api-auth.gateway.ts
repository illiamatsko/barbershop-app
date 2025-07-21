import { UserDto } from '@barbershop-app/shared/domain';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { AuthGateway, SignInDto, SignUpDto } from '@barbershop-app/client/auth/domain';
import { AuthState } from '@barbershop-app/client/core/application';


export class ApiAuthGateway implements AuthGateway {
  private httpClient = inject(HttpClient);
  private API_URL = environment.apiUrl;

  SignIn(signInDto: SignInDto) {
    return this.httpClient.post<AuthState>(`${this.API_URL}/auth/sign-in`, signInDto);
  }

  SignUp(user: SignUpDto) {
    return this.httpClient.post<AuthState>(`${this.API_URL}/auth/sign-up`, user);
  }

  GetUserFromToken(token: string, headers: { Authorization: string }) {
    return this.httpClient.get<UserDto>(`${this.API_URL}/auth/me`, { headers });
  }
}
