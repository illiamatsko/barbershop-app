import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserDto } from '@barbershop-app/shared/types';
import { SignInCommand, SignUpCommand } from '@barbershop-app/api/auth/application';
import { JwtGuard, LocalGuard } from '@barbershop-app/api/auth/infrastructure';
import { AuthResult, AuthRequest } from '@barbershop-app/api/auth/application';
import { SignUpDto } from './dtos/sign-up.dto';
import { CommandBus } from '@nestjs/cqrs';


@Controller()
export class AuthController {
  constructor(private commandBus: CommandBus) {}

  @UseGuards(LocalGuard)
  @Post('sign-in')
  SignIn(@Req() req: AuthRequest): Promise<AuthResult> {
    return this.commandBus.execute(new SignInCommand(req.user));
  }

  @Post('sign-up')
  SignUp(@Body() signUpDto: SignUpDto): Promise<AuthResult> {
    return this.commandBus.execute(new SignUpCommand(signUpDto));
  }

  @UseGuards(JwtGuard)
  @Get('me')
  GetUserFromToken(@Req() req: AuthRequest): UserDto {
    return req.user;
  }
}
