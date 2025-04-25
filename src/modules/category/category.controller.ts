import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { CreateCategoryResponseDto } from './dtos/create-category-response.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiCreatedResponse({ type: CreateCategoryResponseDto })
  @Post()
  async create(@Body() createCategory: CreateCategoryDto): Promise<CreateCategoryResponseDto> {
    const category = await this.categoryService.createCategory(createCategory);
    return new CreateCategoryResponseDto(category);
  }
}
