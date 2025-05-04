import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dtos/login-response.dto';
import { LoginDto } from './dtos/login.dto';
import { GoogleAuthGuard } from '@app/common/guards/google-auth.guard';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({ type: LoginResponseDto })
  @Post('login')
  async login(@Body() body: LoginDto): Promise<LoginResponseDto> {
    const token = await this.authService.authenticate(body.email, body.password);
    return new LoginResponseDto(token);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async loginGoogle() {}

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  redirectGoogle(@Req() req: { user: User }) {
    const token = this.authService.createTokenJwt(req.user);
    return new LoginResponseDto(token);
  }
}
