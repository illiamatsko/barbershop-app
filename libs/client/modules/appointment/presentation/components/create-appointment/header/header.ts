import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LeftArrowIcon, LogoIcon } from '@barbershop-app/client/shared/presentation';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [LeftArrowIcon, LogoIcon],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private router = inject(Router);


  redirectToHome() {
    this.router.navigate(['/']).then()
  }
}
