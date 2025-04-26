import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../category.entity';

export class CategoryResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  constructor(category: Category) {
    this.id = category.id;
    this.name = category.name;
  }
}
