import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-auth-form',
  imports: [CommonModule],
  templateUrl: './auth-form.html',
  styleUrl: './auth-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthForm {
  backgroundImg =
    'https://res.cloudinary.com/dx7xjflm0/image/upload/v1753200417/auth-form_b9eqfx.avif';

  get backgroundStyle() {
    return { 'background-image': `url(${this.backgroundImg})` };
  }
}
