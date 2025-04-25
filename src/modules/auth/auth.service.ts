import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@modules/user/user.service';
import { LoginResponseDto } from './dtos/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async authenticate(email: string, password: string): Promise<LoginResponseDto> {
    const user = await this.userService.findByEmail(email);

    if (!user || !this.userService.verify(user, password)) {
      throw new UnauthorizedException();
    }

    const access_token = this.jwtService.sign({ sub: user.id });

    return { access_token };
  }
}
