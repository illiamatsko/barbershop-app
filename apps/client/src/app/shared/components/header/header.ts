import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserStore } from '../../../features/state/user/user.store';
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
  private userStore = inject(UserStore);

  isSignedIn = computed(() => this.userStore.isSignedIn());

  navigateToSignIn() {
    this.router.navigate(['auth/sign-in']).then();
  }
}
