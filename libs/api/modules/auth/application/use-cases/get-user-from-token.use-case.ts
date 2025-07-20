import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserFromTokenQuery } from '../queries/get-user-from-token.query';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { RoleStrategy } from '../role-strategies/role.strategy';


@QueryHandler(GetUserFromTokenQuery)
export class GetUserFromTokenUseCase implements IQueryHandler<GetUserFromTokenQuery> {
  constructor(
    @Inject('ROLE_STRATEGIES') private authStrategies: RoleStrategy[]
  ) {}

  async execute({ payload }: GetUserFromTokenQuery) {
    const strategy = this.authStrategies.find(s => s.canHandle(payload.role));
    if (!strategy) {
      throw new UnauthorizedException('Invalid user role');
    }

    try {
      return await strategy.execute(payload.email);
    } catch {
      throw new UnauthorizedException('User not found');
    }
  }
}
