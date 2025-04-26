import { ApiProperty } from '@nestjs/swagger';
import { Listing } from '../listing.entity';

export class CreateListingResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
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
