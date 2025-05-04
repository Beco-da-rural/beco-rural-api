import { ApiProperty } from '@nestjs/swagger';
import { Listing } from '../listing.entity';

export class CreateListingResponseDto {
  @ApiProperty({ default: 1 })
  id: number;

  @ApiProperty({ default: 'anuncio' })
  title: string;

  @ApiProperty({ default: 'descrição' })
  description: string;

  @ApiProperty({ default: 1 })
  userId: number;

  @ApiProperty({ default: 1 })
  categoryId: number;

  @ApiProperty()
  createdAt: Date;

  constructor(listing: Listing) {
    this.id = listing.id;
    this.title = listing.title;
    this.description = listing.description;
    this.userId = listing.user.id;
    this.categoryId = listing.category.id;
    this.createdAt = listing.createdAt;
  }
}
