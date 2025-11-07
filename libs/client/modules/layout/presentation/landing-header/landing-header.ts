import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LogoIcon, ProfileIcon } from '@barbershop-app/client/shared/presentation';
import { AuthStore } from '@barbershop-app/client/core/application';


@Component({
  selector: 'app-landing-header',
  imports: [CommonModule, RouterLink, ProfileIcon, LogoIcon],
  templateUrl: './landing-header.html',
  styleUrl: './landing-header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingHeader {
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
