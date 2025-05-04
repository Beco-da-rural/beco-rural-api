import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto, createCategorySchema } from './dtos/create-category.dto';
import { CreateCategoryResponseDto } from './dtos/create-category-response.dto';
import { CategoryResponseDto } from './dtos/catergory-response.dto';
import { JwtAuthGuard } from '@app/common/guards/jwt-auth.guard';
import { ZodPipe } from '@app/common/pipe/zod.pipe';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiCreatedResponse({ type: CreateCategoryResponseDto })
  @Post()
  async create(
    @Body(new ZodPipe(createCategorySchema)) createCategory: CreateCategoryDto,
  ): Promise<CreateCategoryResponseDto> {
    const category = await this.categoryService.createCategory(createCategory);
    return new CreateCategoryResponseDto(category);
  }

  @ApiOkResponse({ type: [CategoryResponseDto] })
  @Get()
  async list(): Promise<CategoryResponseDto[]> {
    const categories = await this.categoryService.listAll();
    return categories.map((category) => new CategoryResponseDto(category));
  }
}
