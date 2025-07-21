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
      photoUrl: barber.photoUrl,
      experience: barber.experience,
      status: barber.status,
      starRating: barber.starRating,
      reviewsCount: barber.reviewsCount,
      location: barber.location,
      role: barber.role.toString(),
      createdAt: barber.createdAt.toISOString(),
    };
  }

  static toCreateUserDto(createBarberDto: CreateBarberDto): CreateUserDto {
    return {
      email: createBarberDto.email,
      password: createBarberDto.password,
      firstName: createBarberDto.firstName,
      lastName: createBarberDto.lastName,
      phoneNumber: createBarberDto.phoneNumber,
      role: RolesEnum.BARBER
    };
  }

  static toCreateBarberRecordDto(createBarberDto: CreateBarberDto, userId: number): CreateBarberRecordDto {
    return {
      userId,
      barbershopId: createBarberDto.barbershopId,
      statusId: createBarberDto.statusId,
      photoUrl: createBarberDto.photoUrl,
      experience: createBarberDto.experience
    }
  }
}
