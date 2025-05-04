import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class LoginDto {
  @ApiProperty({ default: 'john@email.com' })
  email!: string;

  @ApiProperty({ default: '12345678' })
  password!: string;
}

export const loginSchema = z
  .object({
    email: z.string().email(),
    password: z.string().nonempty(),
  })
  .strict();
