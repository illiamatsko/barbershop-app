import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';
import { LocalGuard } from './guards/local.guard';
import { AuthRequest } from '../interfaces/auth-request.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('sign-in')
  SignIn(@Req() req: AuthRequest) {
    const token = this.authService.getToken(req.user);
    return { payload: req.user, token };
  }

  @Post('sign-up')
  SignUp() {
    return this.authService.SignUp();
  }

  @Get('status')
  @UseGuards(JwtGuard)
  status(@Req() req: AuthRequest) {
    return req.user;
  }
}
