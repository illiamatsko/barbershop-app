import { Injectable, NotImplementedException } from '@nestjs/common';
import { UserRepository } from '@barbershop-app/user';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userRepo: UserRepository,
    private jwtService: JwtService
  ) {}

  SignUp() {
    throw new NotImplementedException();
  }

  async validateUser(email: string, entered_password: string) {
    const user = await this.userRepo.findByEmail(email);

    if (!user || !this.IsPasswordCorrect(entered_password, user.password))
      return null;

    const { password: _, ...payload } = user;
    return { payload, token: this.jwtService.sign(payload) };
  }

  IsPasswordCorrect(password: string, bd_password: string) {
    return password === bd_password;
  }
}
