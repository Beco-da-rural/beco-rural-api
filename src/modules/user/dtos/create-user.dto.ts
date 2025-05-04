import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class CreateUserDto {
  @ApiProperty({ default: 'John' })
  name!: string;

  @ApiProperty({ default: '12345678' })
  password!: string;

  @ApiProperty({ default: 'john@email.com' })
  email!: string;
}

export const createUserSchema = z
  .object({
    name: z.string().nonempty(),
    password: z.string().nonempty(),
    email: z.string().email(),
  })
  .strict();
