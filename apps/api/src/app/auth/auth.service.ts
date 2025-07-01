import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '@barbershop-app/user';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { AuthResult, CreateUserDto, JwtPayload } from '@barbershop-app/models';
import { User } from '@prisma/client';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private userRepo: UserRepository,
    private jwtService: JwtService
  ) {}

  SignIn(user: JwtPayload): AuthResult {
    return { payload: user, token: this.signToken(user) }
  }

  getPayloadFromUser(user: User) {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      role: user.role,
      createdAt: user.createdAt.toString()
    }
  }

  async validateUser(email: string, entered_password: string): Promise<JwtPayload | null> {
    const user: User = await this.userRepo.findByEmail(email);

    if (!user || !await this.IsPasswordCorrect(entered_password, user.password)) return null;

    return this.getPayloadFromUser(user);
  }

  async SignUp(createUserDto: CreateUserDto): Promise<AuthResult> {
    if(await this.userRepo.findByEmail(createUserDto.email)) throw new BadRequestException('Email already exists')

    createUserDto.password = await this.hashPassword(createUserDto.password);
    const user = await this.userRepo.create(createUserDto);

    const payload = this.getPayloadFromUser(user);
    return { payload, token: this.signToken(payload) };
  }

  async hashPassword(password: string) {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    return salt + '.' + hash.toString('hex');
  }

  async IsPasswordCorrect(password: string, bd_password: string) {
    const [salt, originalHash] = bd_password.split('.');
    const hashBuffer = (await scrypt(password, salt, 32)) as Buffer;
    return originalHash === hashBuffer.toString('hex');
  }

  signToken(user: JwtPayload) {
    return this.jwtService.sign(user);
  }
}
