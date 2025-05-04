import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListingController } from '@app/modules/listing/listing.controller';
import { Listing } from '@app/modules/listing/listing.entity';
import { ListingService } from '@app/modules/listing/listing.service';

@Module({
  imports: [TypeOrmModule.forFeature([Listing])],
  controllers: [ListingController],
  providers: [ListingService],
})
export class ListingModule {}
