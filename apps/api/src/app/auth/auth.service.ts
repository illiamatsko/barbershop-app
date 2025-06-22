import { Injectable, NotImplementedException } from '@nestjs/common';
import { UserRepository } from '@barbershop-app/user';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userRepo: UserRepository,
    private jwtService: JwtService
  ) {}

  SignUp() {
    throw new NotImplementedException();
  }

  async validateUser(email: string, entered_password: string): Promise<JwtPayload | null> {
    const user = await this.userRepo.findByEmail(email);

    if (!user || !this.IsPasswordCorrect(entered_password, user.password))
      return null;

    const { password: _, ...payload } = user;
    return payload;
  }

  IsPasswordCorrect(password: string, bd_password: string) {
    return password === bd_password;
  }

  getToken(user: JwtPayload) {
    return this.jwtService.sign(user);
  }
}
