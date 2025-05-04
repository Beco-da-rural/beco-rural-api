import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async authenticate(email: string, password: string): Promise<string> {
    const user = await this.getUserOrThrow(email);

    if (!this.userService.verify(user, password)) {
      throw new UnauthorizedException();
    }

    return this.createTokenJwt(user);
  }

  private async getUserOrThrow(email: string): Promise<User> {
    try {
      return await this.userService.findByEmail(email);
    } catch {
      throw new UnauthorizedException();
    }
  }

  createTokenJwt(user: User): string {
    return this.jwtService.sign({ sub: user.id });
  }
}
