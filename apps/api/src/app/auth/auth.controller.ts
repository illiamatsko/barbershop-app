import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { AuthRequest } from '../interfaces/auth-request.interface';
import { CreateUserDto } from '@barbershop-app/models';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('sign-in')
  SignIn(@Req() req: AuthRequest) {
    return this.authService.SignIn(req.user);
  }

  @Post('sign-up')
  SignUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.SignUp(createUserDto);
  }
}
