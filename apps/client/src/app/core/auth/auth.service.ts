import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';
import { AuthStore } from '../../features/state/auth/auth.store';
import { authState } from '../../features/state/auth/auth.state';
import { JwtPayload } from '@barbershop-app/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authStore = inject(AuthStore);
  private httpClient = inject(HttpClient);
  private API_URL = environment.apiUrl;

  error = signal<string>('');

  signIn(email: string, password: string) {
    this.httpClient.post<authState>(`${this.API_URL}/auth/sign-in`, { email, password }).subscribe({
      next: res => {
        localStorage.setItem('token', res.token);
        this.authStore.setUser(res);
      },
      error: (e) => this.error.set(e.error?.message || 'Unknown error. Please, try again later.')
    })
  }

  signUp(email: string, password: string) {
    this.httpClient.post<authState>(`${this.API_URL}/auth/sign-up`, { email, password }).subscribe({
      next: res => {
        localStorage.setItem('token', res.token);
        this.authStore.setUser(res);
        this.error.set('')
      },
      error: (e) => this.error.set(e.error?.message || 'Unknown error. Please, try again later.')
    })
  }

  signOut() {
    localStorage.removeItem('token');
    this.authStore.unsetUser();
  }

  getUserFromToken() {
    const token = localStorage.getItem('token')
    if(!token) return;

    const headers = { Authorization: `Bearer ${token}` };

    this.httpClient.get<JwtPayload>(`${this.API_URL}/auth/me`, { headers }).subscribe({
      next: (user) => {
        this.authStore.setUser({ user, token });
      }
    })
  }
}
