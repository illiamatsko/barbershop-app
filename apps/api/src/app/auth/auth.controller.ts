import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthRequest, CreateUserDto, JwtPayload } from '@barbershop-app/types';
import { SignInUseCase, SignUpUseCase } from '@barbershop-app/auth/application';
import { JwtGuard, LocalGuard } from '@barbershop-app/auth/infrastructure';

@Controller()
export class AuthController {
  constructor(
    private signInUseCase: SignInUseCase,
    private signUpUseCase: SignUpUseCase,
    ) {}

  @UseGuards(LocalGuard)
  @Post('sign-in')
  SignIn(@Req() req: AuthRequest) {
    return this.signInUseCase.execute(req.user);
  }

  @Post('sign-up')
  SignUp(@Body() createUserDto: CreateUserDto) {
    return this.signUpUseCase.execute(createUserDto);
  }

  @UseGuards(JwtGuard)
  @Get('me')
  GetUserFromToken(@Req() req: AuthRequest): JwtPayload {
    return req.user;
  }
}
