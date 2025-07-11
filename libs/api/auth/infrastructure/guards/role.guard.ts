import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchRoles(roles: string[], userRole: string) {
    return roles.some(role => userRole === role);
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if(!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if(!this.matchRoles(roles, user.role)) throw new ForbiddenException('Access denied: insufficient role');

    return true;
  }
}
