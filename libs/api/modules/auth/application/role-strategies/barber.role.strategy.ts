import { RoleStrategy } from './role.strategy';
import { BarberMapper, BarberRepository } from '@barbershop-app/api/auth/domain';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BarberFullDto } from '@barbershop-app/shared/domain';

@Injectable()
export class BarberRoleStrategy implements RoleStrategy {
  constructor(private barberRepo: BarberRepository) {}

  canHandle(role: string): boolean {
    return role === 'BARBER';
  }

  async execute(email: string): Promise<BarberFullDto> {
    const barberEntity = await this.barberRepo.getByEmail(email);
    if (!barberEntity) throw new UnauthorizedException();
    return BarberMapper.toFullDto(barberEntity);
  }
}
