import { PasswordHelper, PasswordRepository, UserRepository } from '@barbershop-app/core/domain';
import { JwtPayload } from '@barbershop-app/types';
import { Injectable } from '@nestjs/common';


@Injectable()
export class ValidateUserUseCase {
  constructor(
    private userRepo: UserRepository,
    private passwordRepo: PasswordRepository,
    private passwordHelper: PasswordHelper
    ) {}

  async execute(email: string, entered_password: string): Promise<JwtPayload | null> {
    const bd_password = await this.passwordRepo.getHashedPasswordByUserEmail(email);

    if (!bd_password || !await this.passwordHelper.checkPassword(entered_password, bd_password)) return null;

    return this.userRepo.findByEmail(email);
  }
}
