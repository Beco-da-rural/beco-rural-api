import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class CreateCategoryDto {
  @ApiProperty({ default: 'categoria' })
  name!: string;
}

export const createCategorySchema = z.object({ name: z.string().nonempty() }).strict();
