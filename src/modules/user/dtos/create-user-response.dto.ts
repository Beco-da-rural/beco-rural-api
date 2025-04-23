import { User } from '../user.entity';

export class CreateUserResponseDto {
  id: number;
  name: string;
  email: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }
}
