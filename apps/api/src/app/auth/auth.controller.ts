import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  SignIn() {
    return {};
  }

  @Post('sign-up')
  SignUp() {
    return this.authService.SignUp();
  }
}
