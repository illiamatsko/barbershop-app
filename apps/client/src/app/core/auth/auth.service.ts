import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private httpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  signIn(email: string, password: string) {
    this.httpClient.post(`${this.apiUrl}/auth/sign-in`, { email, password }).subscribe({
      next: res => console.log(res)
    })
  }
}
