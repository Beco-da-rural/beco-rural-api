import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { GoogleAuthGuard } from '@app/common/guards/google-auth.guard';
import { ZodPipe } from '@app/common/pipe/zod.pipe';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dtos/login-response.dto';
import { LoginDto, loginSchema } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse({ type: LoginResponseDto })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body(new ZodPipe(loginSchema)) body: LoginDto): Promise<LoginResponseDto> {
    const token = await this.authService.authenticate(body.email, body.password);
    return new LoginResponseDto(token);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async loginGoogle() {}

  @ApiOkResponse({ type: LoginResponseDto })
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  redirectGoogle(@Req() req: { user: User }) {
    const token = this.authService.createTokenJwt(req.user);
    return new LoginResponseDto(token);
  }
}
