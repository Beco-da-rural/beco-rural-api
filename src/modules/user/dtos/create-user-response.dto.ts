import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user.entity';

export class CreateUserResponseDto {
  @ApiProperty({ default: 1 })
  id: number;

  @ApiProperty({ default: 'John' })
  name: string;

  @ApiProperty({ default: 'john@email.com' })
  email: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }
}
