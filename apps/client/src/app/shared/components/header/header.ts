import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthStore } from '../../../features/state/auth/auth.store';
import { ProfileIcon } from '@barbershop-app/ui';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, ProfileIcon],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private router = inject(Router);
  private userStore = inject(AuthStore);

  isSignedIn = computed(() => this.userStore.isSignedIn());

  navigateToSignIn() {
    this.router.navigateByUrl('auth/sign-in').then();
  }

  navigateToSignUp() {
    this.router.navigateByUrl('auth/sign-up').then();
  }
}
