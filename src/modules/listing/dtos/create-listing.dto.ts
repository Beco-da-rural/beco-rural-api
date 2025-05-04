import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class CreateListingDto {
  @ApiProperty({ default: 'anuncio' })
  title!: string;

  @ApiProperty({ default: 'descrição' })
  description!: string;

  @ApiProperty({ default: 1 })
  categoryId!: number;
}

export const createListingSchema = z
  .object({
    title: z.string().nonempty(),
    description: z.string().nonempty(),
    categoryId: z.number().min(1),
  })
  .strict();
