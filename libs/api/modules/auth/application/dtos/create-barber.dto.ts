import { IsEmail, IsNumber, IsPhoneNumber, IsString } from 'class-validator';
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

  @IsNumber()
  experience!: number

  @IsNumber()
  barbershopId!: number

  @IsNumber()
  statusId!: number
}
