import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async authenticate(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(email);

    if (!user || !this.userService.verify(user, password)) {
      throw new UnauthorizedException();
    }

    return {
      access_token: this.jwtService.sign({ sub: user.id }),
    };
  }
}
