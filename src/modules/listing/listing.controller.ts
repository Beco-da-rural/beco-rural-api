import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ZodPipe } from '@app/common/pipe/zod.pipe';
import { JwtAuthGuard } from '@app/common/guards/jwt-auth.guard';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { JwtPayload } from '../auth/jwt-payload';
import { ListingService } from './listing.service';
import { CreateListingResponseDto } from './dtos/create-listing-response.dto';
import { CreateListingDto, createListingSchema } from './dtos/create-listing.dto';
import { ListingPaginationDto, listingPaginationSchema } from './dtos/listing-pagination.dto';
import { ListingPaginationResponseDto } from './dtos/listing-pagination-response.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('listings')
export class ListingController {
  constructor(private listingService: ListingService) {}

  @ApiCreatedResponse({ type: CreateListingResponseDto })
  @Post()
  async create(
    @Body(new ZodPipe(createListingSchema)) body: CreateListingDto,
    @CurrentUser() user: JwtPayload,
  ): Promise<CreateListingResponseDto> {
    const listing = await this.listingService.create(body, user.sub);
    return new CreateListingResponseDto(listing);
  }

  @ApiOkResponse({ type: ListingPaginationResponseDto })
  @Get()
  async list(
    @Query(new ZodPipe(listingPaginationSchema)) pagination: ListingPaginationDto,
  ): Promise<ListingPaginationResponseDto> {
    const { cursor, limit } = pagination;

    const { listings, nextCursor } = await this.listingService.list(cursor, limit);

    return new ListingPaginationResponseDto(listings, nextCursor);
  }
}
