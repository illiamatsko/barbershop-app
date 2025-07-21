import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LeftArrowIcon, LogoIcon } from '@barbershop-app/shared/presentation';


@Component({
  selector: 'app-header',
  imports: [LeftArrowIcon, LogoIcon],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {}
