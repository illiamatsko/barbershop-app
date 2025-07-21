import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LogoIcon, ProfileIcon } from '@barbershop-app/shared/presentation';
import { AuthStore } from '@barbershop-app/client/core/application';


@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, ProfileIcon, LogoIcon],
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
