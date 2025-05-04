import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export class ListingPaginationDto {
  @ApiProperty({ required: false })
  cursor?: number;

  @ApiProperty()
  limit!: number;
}

export const listingPaginationSchema = z
  .object({
    cursor: z
      .string()
      .transform((value) => Number(value))
      .optional(),
    limit: z
      .string()
      .transform((value) => Number(value))
      .default('10'),
  })
  .strict();
