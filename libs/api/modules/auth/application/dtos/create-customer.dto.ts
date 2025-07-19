import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';
import { CreateCustomerPayload } from '@barbershop-app/shared/types';

export class CreateCustomerDto implements CreateCustomerPayload {
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
}
