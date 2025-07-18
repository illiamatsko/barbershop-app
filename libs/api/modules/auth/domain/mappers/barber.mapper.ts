import { BarberFullEntity } from '../entities/barber-full.entity';
import { BarberFullDto } from '@barbershop-app/shared/types';
import { CreateBarberDto } from '../dtos/create-barber.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateBarberRecordDto } from '../dtos/create-barber-record.dto';
import { RolesEnum } from '@barbershop-app/api/shared/auth';

export class BarberMapper {
  static toFullDto(barber: BarberFullEntity): BarberFullDto {
    return {
      id: barber.id,
      email: barber.email,
      firstName: barber.firstName,
      lastName: barber.lastName,
      phoneNumber: barber.phoneNumber,
      experience: barber.experience,
      status: barber.status,
      starRating: 5,
      reviewsCount: 5,
      location: barber.location,
      role: barber.role.toString(),
      createdAt: barber.createdAt.toISOString(),
    };
  }

  static toCreateUserPayload(createBarberDto: CreateBarberDto): CreateUserDto {
    return {
      email: createBarberDto.email,
      password: createBarberDto.password,
      firstName: createBarberDto.firstName,
      lastName: createBarberDto.lastName,
      phoneNumber: createBarberDto.phoneNumber,
      role: RolesEnum.BARBER
    };
  }

  static toCreateBarberRecordPayload(createBarberDto: CreateBarberDto, userId: number): CreateBarberRecordDto {
    return {
      userId,
      barbershopId: createBarberDto.barbershopId,
      statusId: createBarberDto.statusId,
      experience: createBarberDto.experience
    }
  }
}
