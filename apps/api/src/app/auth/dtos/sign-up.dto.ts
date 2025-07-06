import { IsEmail, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email: string

  @IsString()
  firstName: string

  @IsString()
  lastName: string

  @IsString()
  @IsPhoneNumber('UA')
  phoneNumber: string

  @IsString()
  @MinLength(6)
  password: string
}
