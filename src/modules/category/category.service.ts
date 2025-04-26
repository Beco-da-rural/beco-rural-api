import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DomainException } from '@common/exceptions/domain.exception';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {}

  async createCategory(categoryRequest: CreateCategoryDto): Promise<Category> {
    const exist = await this.categoryRepository.findOneBy({ name: categoryRequest.name });

    if (exist) {
      throw new DomainException('categoria ja existe');
    }

    return await this.categoryRepository.save({
      name: categoryRequest.name,
    });
  }

  async listAll() {
    return await this.categoryRepository.find();
  }
}
