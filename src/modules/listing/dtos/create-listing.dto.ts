import { ApiProperty } from '@nestjs/swagger';

export class CreateListingDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  categoryId: number;
}
