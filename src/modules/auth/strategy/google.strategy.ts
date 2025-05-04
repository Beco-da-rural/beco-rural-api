import { DomainException } from '@app/common/exceptions/domain.exception';
import { User } from '@app/modules/user/user.entity';
import { UserService } from '@app/modules/user/user.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private userService: UserService,
    config: ConfigService,
  ) {
    super({
      clientID: config.getOrThrow('GOOGLE_CLIENT_ID'),
      clientSecret: config.getOrThrow('GOOGLE_CLIENT_SECRET'),
      callbackURL: config.getOrThrow('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<User> {
    const { email, name } = this.getData(profile);
    const user = await this.getUser(email, name);
    done(null, user);
    return user;
  }

  getData(profile: Profile) {
    if (!profile.emails || !profile.name) {
      throw new Error();
    }

    const email = profile.emails[0].value;
    const name = `${profile.name.givenName} ${profile.name.middleName} ${profile.name.familyName}`;

    return { email, name };
  }

  async getUser(email: string, name: string) {
    try {
      return await this.userService.findByEmail(email);
    } catch {
      return await this.createUser(email, name);
    }
  }

  private async createUser(email: string, name: string) {
    const user = new User();

    user.email = email;
    user.name = name;

    try {
      return await this.userService.createUser(user);
    } catch (err) {
      console.log(err);
      throw new DomainException('falha ao criar novo usuario');
    }
  }
}
