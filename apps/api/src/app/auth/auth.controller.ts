import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { SignUpUserDto, UserDto } from '@barbershop-app/shared/types';
import { SignInUseCase, SignUpUseCase } from '@barbershop-app/api/auth/application';
import { JwtGuard, LocalGuard } from '@barbershop-app/api/auth/infrastructure';
import { AuthResult, AuthRequest } from '@barbershop-app/api/auth/application';


@Controller()
export class AuthController {
  constructor(
    private signInUseCase: SignInUseCase,
    private signUpUseCase: SignUpUseCase,
    ) {}

  @UseGuards(LocalGuard)
  @Post('sign-in')
  SignIn(@Req() req: AuthRequest): Promise<AuthResult> {
    return this.signInUseCase.execute(req.user);
  }

  @Post('sign-up')
  SignUp(@Body() signUpUserDto: SignUpUserDto): Promise<AuthResult> {
    return this.signUpUseCase.execute(signUpUserDto);
  }

  @UseGuards(JwtGuard)
  @Get('me')
  GetUserFromToken(@Req() req: AuthRequest): UserDto {
    return req.user;
  }
}
