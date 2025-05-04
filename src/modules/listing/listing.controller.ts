import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateListingDto } from './dtos/create-listing.dto';
import { ListingService } from './listing.service';
import { JwtAuthGuard } from '@app/common/guards/jwt-auth.guard';
import { CreateListingResponseDto } from './dtos/create-listing-response.dto';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { JwtPayload } from '../auth/jwt-payload';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('listings')
export class ListingController {
  constructor(private listingService: ListingService) {}

  @ApiCreatedResponse({ type: CreateListingResponseDto })
  @Post()
  async create(@Body() body: CreateListingDto, @CurrentUser() user: JwtPayload): Promise<CreateListingResponseDto> {
    const listing = await this.listingService.create(body, user.sub);
    return new CreateListingResponseDto(listing);
  }
}
