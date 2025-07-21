import { IsEmail, IsNumber, IsPhoneNumber, IsString, IsUrl } from 'class-validator';
import { CreateBarberPayload } from '@barbershop-app/shared/types';

export class CreateBarberDto implements CreateBarberPayload {
  @IsEmail()
  email!: string

  @IsString()
  password!: string

  @IsString()
  firstName!: string

  @IsString()
  lastName!: string

  @IsPhoneNumber('UA')
  phoneNumber!: string

  @IsUrl()
  photoUrl!: string

  @IsNumber()
  experience!: number

  @IsNumber()
  barbershopId!: number

  @IsNumber()
  statusId!: number
}
