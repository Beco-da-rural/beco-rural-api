import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { DomainException } from '@app/common/exceptions/domain.exception';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async createUser(user: User): Promise<User> {
    const exist = await this.userRepository.findOneBy({ email: user.email });

    if (exist) {
      throw new DomainException('email ja em uso');
    }

    if (user.password) {
      user.password = bcrypt.hashSync(user.password, 10);
    }

    return await this.userRepository.save(user);
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
