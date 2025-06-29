import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { AuthRequest } from '../interfaces/auth-request.interface';
import { CreateUserDto, JwtPayload } from '@barbershop-app/models';
import { JwtGuard } from './guards/jwt.guard';

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

  @UseGuards(JwtGuard)
  @Get('me')
  GetUserFromToken(@Req() req: AuthRequest): JwtPayload {
    return req.user;
  }
}
