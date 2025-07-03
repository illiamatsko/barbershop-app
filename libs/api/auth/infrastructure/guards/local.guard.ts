import { AuthGuard } from "@nestjs/passport";
import { ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class LocalGuard extends AuthGuard('local') {
  override canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
