import { ApiProperty } from '@nestjs/swagger';
import { Listing } from '../listing.entity';

export class ListingItemDto {
  @ApiProperty({ default: 1 })
  id: number;

  @ApiProperty({ default: 'anuncio' })
  title: string;

  @ApiProperty({ default: 'descrição' })
  description: string;

  @ApiProperty({ default: 1 })
  categoryId: number;

  @ApiProperty({ default: 1 })
  userId: number;

  @ApiProperty()
  createdAt: Date;

  constructor(listing: Listing) {
    this.id = listing.id;
    this.title = listing.title;
    this.description = listing.description;
    this.createdAt = listing.createdAt;
    this.categoryId = listing.category.id;
    this.userId = listing.user.id;
  }
}
