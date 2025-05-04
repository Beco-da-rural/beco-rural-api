import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../category.entity';

export class CategoryResponseDto {
  @ApiProperty({ default: 1 })
  id: number;

  @ApiProperty({ default: 'categoria' })
  name: string;

  constructor(category: Category) {
    this.id = category.id;
    this.name = category.name;
  }
}
