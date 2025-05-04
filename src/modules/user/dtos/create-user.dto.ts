import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user.entity';
import { z } from 'zod';

export class CreateUserDto {
  @ApiProperty({ default: 'John' })
  name!: string;

  @ApiProperty({ default: '12345678' })
  password!: string;

  @ApiProperty({ default: 'john@email.com' })
  email!: string;

  toUser(): User {
    const user = new User();

    user.name = this.name;
    user.password = this.password;
    user.email = this.email;

    return user;
  }
}

export const createUserSchema = z
  .object({
    name: z.string().nonempty(),
    passwrod: z.string().nonempty(),
    email: z.string().email(),
  })
  .strict();
