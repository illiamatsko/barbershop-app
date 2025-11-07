import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LeftArrowIcon } from '../icons/left-arrow-icon/left-arrow-icon';
import { LogoIcon } from '../icons/logo-icon/logo-icon';
import { Router } from '@angular/router';


@Component({
  selector: 'lib-header',
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
