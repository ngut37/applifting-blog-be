import { Controller, Post, Body, Put } from '@nestjs/common';

import { RegisterUserDto } from './dto/register-user.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Put('/register')
  async register(@Body() authCredentialsDto: RegisterUserDto): Promise<void> {
    await this.authService.register(authCredentialsDto);
  }

  @Post('/login')
  async login(
    @Body() loginCredentialsDto: LoginCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.login(loginCredentialsDto);
  }
}
