import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './listing.entity';
import { FindManyOptions, LessThan, Repository } from 'typeorm';
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

  async list(cursor: number = 0, limit: number) {
    const findOptions: FindManyOptions<Listing> = {
      order: { id: 'DESC' },
      take: limit + 1,
      loadRelationIds: { disableMixedMap: true },
    };

    if (cursor) {
      findOptions.where = { id: LessThan(cursor) };
    }

    const listings = await this.listingRepository.find(findOptions);

    const nextCursor = listings.length > limit ? listings.pop()!.id : null;

    return {
      listings,
      nextCursor,
    };
  }
}
