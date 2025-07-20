import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthRequest, AuthResult } from '@barbershop-app/api/auth/domain';
import {
  CreateCustomerDto,
  CreateBarberDto,
  CreateBarberCommand,
  GetUserFromTokenQuery
} from '@barbershop-app/api/auth/application';
import { CreateCustomerCommand, SignInCommand } from '@barbershop-app/api/auth/application';
import { JwtGuard, LocalGuard, RoleGuard, Roles } from '@barbershop-app/api/shared/auth';


@Controller()
export class AuthController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus
  ) {}

  @UseGuards(LocalGuard)
  @Post('sign-in')
  SignIn(@Req() req: AuthRequest): Promise<AuthResult> {
    return this.commandBus.execute(new SignInCommand(req.user));
  }

  @Post('sign-up')
  SignUp(@Body() payload: CreateCustomerDto): Promise<AuthResult> {
    return this.commandBus.execute(new CreateCustomerCommand(payload));
  }

  @Roles('MANAGER', 'SUPER_ADMIN')
  @UseGuards(JwtGuard, RoleGuard)
  @Post('create-barber')
  CreateBarber(@Body() payload: CreateBarberDto): Promise<AuthResult> {
    return this.commandBus.execute(new CreateBarberCommand(payload));
  }

  @UseGuards(JwtGuard)
  @Get('me')
  GetUserFromToken(@Req() req: AuthRequest) {
    return this.queryBus.execute(new GetUserFromTokenQuery(req.user));
  }
}
