import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import { DomainException } from '@app/common/exceptions/domain.exception';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const exist = await this.userRepository.findOneBy({ email: createUserDto.email });

    if (exist) {
      throw new DomainException('email ja em uso');
    }

    const hashedPassword = bcrypt.hashSync(createUserDto.password, 10);

    return await this.userRepository.save({
      email: createUserDto.email,
      name: createUserDto.name,
      password: hashedPassword,
    });
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new DomainException('usuario não encontrado');
    }

    return user;
  }

  public verify(user: User, password: string) {
    return bcrypt.compareSync(password, user.password);
  }
}
