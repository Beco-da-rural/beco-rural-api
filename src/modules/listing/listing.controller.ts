import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { ZodPipe } from '@app/common/pipe/zod.pipe';
import { JwtAuthGuard } from '@app/common/guards/jwt-auth.guard';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { JwtPayload } from '../auth/jwt-payload';
import { CreateListingResponseDto } from './dtos/create-listing-response.dto';
import { CreateListingDto, createListingSchema } from './dtos/create-listing.dto';
import { ListingService } from './listing.service';

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
}
