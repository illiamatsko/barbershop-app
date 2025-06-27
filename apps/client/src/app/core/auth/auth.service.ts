import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';
import { UserStore } from '../../features/state/user/user.store';
import { userSlice } from '../../features/state/user/user.slice';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userStore = inject(UserStore);
  private httpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  signIn(email: string, password: string) {
    this.httpClient.post<userSlice>(`${this.apiUrl}/auth/sign-in`, { email, password }).subscribe({
      next: res => this.userStore.setUser(res)
    })
  }
}
