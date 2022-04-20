import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginCredentialsDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  password: string;
}
