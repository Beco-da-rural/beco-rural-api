import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateUserResponseDto } from './dtos/create-user-response.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    const exist = await this.userRepository.findOneBy({ email: createUserDto.email });

    if (exist) {
      throw new Error('email ja em uso');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.userRepository.save({
      email: createUserDto.email,
      name: createUserDto.name,
      password: hashedPassword,
    });

    return new CreateUserResponseDto(user);
  }
}
