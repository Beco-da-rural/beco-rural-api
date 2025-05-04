import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user.entity';

export class CreateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;

  toUser(): User {
    const user = new User();

    user.name = this.name;
    user.password = this.password;
    user.email = this.email;

    return user;
  }
}
