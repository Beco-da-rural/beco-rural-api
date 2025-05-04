import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dtos/login-response.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({ type: LoginResponseDto })
  @Post('login')
  async login(@Body() body: LoginDto): Promise<LoginResponseDto> {
    const token = await this.authService.authenticate(body.email, body.password);
    return new LoginResponseDto(token);
  }
}
