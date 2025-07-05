import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { Injectable } from '@nestjs/common';
import { PasswordHelper } from '@barbershop-app/api/core/domain';

const scrypt = promisify(_scrypt);


@Injectable()
export class BcryptPasswordHelper implements PasswordHelper {
  async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    return salt + '.' + hash.toString('hex');
  }

  async checkPassword(password: string, bd_password: string): Promise<boolean> {
    const [salt, originalHash] = bd_password.split('.');
    const hashBuffer = (await scrypt(password, salt, 32)) as Buffer;
    return originalHash === hashBuffer.toString('hex');
  }
}
