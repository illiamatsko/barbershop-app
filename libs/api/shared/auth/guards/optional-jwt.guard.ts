import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJwtGuard extends AuthGuard('jwt') {
  override canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      return true;
    }

    return super.canActivate(context);
  }

  override handleRequest(err: any, user: any, info: any) {
    if (err || info) {
      return null;
    }

    return user ?? null;
  }
}
