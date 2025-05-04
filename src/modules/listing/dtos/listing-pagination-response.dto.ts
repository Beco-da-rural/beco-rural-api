import { ApiProperty } from '@nestjs/swagger';
import { Listing } from '../listing.entity';
import { ListingItemDto } from './listing-item.dto';

export class ListingPaginationResponseDto {
  @ApiProperty({ type: [ListingItemDto] })
  listings: ListingItemDto[];

  @ApiProperty({ type: Number, nullable: true, default: null })
  nextCursor: number | null;

  constructor(listings: Listing[], nextCursor: number | null) {
    this.listings = listings.map((listing) => new ListingItemDto(listing));
    this.nextCursor = nextCursor;
  }
}
