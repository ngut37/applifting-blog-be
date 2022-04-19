//This DTO serves both signing-up and signing-in feature.

import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginCredentialsDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  password: string;
}
