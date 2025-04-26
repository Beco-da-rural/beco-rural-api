import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './listing.entity';
import { Repository } from 'typeorm';
import { CreateListingDto } from './dtos/create-listing.dto';

@Injectable()
export class ListingService {
  constructor(@InjectRepository(Listing) private listingRepository: Repository<Listing>) {}

  async create(request: CreateListingDto, userId: number) {
    return await this.listingRepository.save({
      title: request.title,
      description: request.description,
      category: {
        id: request.categoryId,
      },
      user: {
        id: userId,
      },
    });
  }
}
