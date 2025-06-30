import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthStore } from '../../../features/state/user/auth.store';
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
    this.router.navigate(['auth/sign-in']).then();
  }

  navigateToSignUp() {
    this.router.navigate(['auth/sign-up']).then();
  }
}
