import {
  Controller,
  Post,
  Body,
  Put,
  // UseGuards,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

import { RegisterUserDto } from './dto/register-user.dto';

import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
// import { User } from './user.entity';
// import { GetUser } from './get-user.decorator';

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

  // @Post('/test')
  // @UseGuards(AuthGuard())
  // test(@GetUser() user: User) {
  //   console.log(user);
  // }
}
