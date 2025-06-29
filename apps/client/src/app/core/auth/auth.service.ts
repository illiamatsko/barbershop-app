import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';
import { UserStore } from '../../features/state/user/user.store';
import { userSlice } from '../../features/state/user/user.slice';
import { JwtPayload } from '@barbershop-app/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userStore = inject(UserStore);
  private httpClient = inject(HttpClient);
  private API_URL = environment.apiUrl;

  signIn(email: string, password: string) {
    this.httpClient.post<userSlice>(`${this.API_URL}/auth/sign-in`, { email, password }).subscribe({
      next: res => {
        localStorage.setItem('token', res.token);
        this.userStore.setUser(res);
      }
    })
  }

  signOut() {
    localStorage.removeItem('token');
    this.userStore.unsetUser();
  }

  getUserFromToken() {
    const token = localStorage.getItem('token')
    if(!token) return;

    const headers = { Authorization: `Bearer ${token}` };

    this.httpClient.get<JwtPayload>(`${this.API_URL}/auth/me`, { headers }).subscribe({
      next: (user) => {
        this.userStore.setUser({ user, token });
      },
    });
  }
}
