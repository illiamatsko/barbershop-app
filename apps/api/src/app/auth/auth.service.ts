import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  SignIn() {
    throw new NotImplementedException();
  }

  SignUp() {
    throw new NotImplementedException();
  }
}
