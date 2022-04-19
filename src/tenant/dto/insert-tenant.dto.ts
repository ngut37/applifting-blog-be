import { IsNotEmpty, IsString } from 'class-validator';

export class InsertTenantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
