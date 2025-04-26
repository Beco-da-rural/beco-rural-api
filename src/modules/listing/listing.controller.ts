import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateListingDto } from './dtos/create-listing.dto';
import { ListingService } from './listing.service';
import { JwtAuthGuard } from '@app/common/guards/jwt-auth.guard';
import { User } from '../user/user.entity';
import { CreateListingResponseDto } from './dtos/create-listing-response.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('listings')
export class ListingController {
  constructor(private listingService: ListingService) {}

  @ApiCreatedResponse({ type: CreateListingResponseDto })
  @Post()
  async create(@Body() body: CreateListingDto, @Request() request: { user: User }): Promise<CreateListingResponseDto> {
    const listing = await this.listingService.create(body, request.user.id);
    return new CreateListingResponseDto(listing);
  }
}
