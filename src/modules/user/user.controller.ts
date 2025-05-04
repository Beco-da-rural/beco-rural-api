import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { ZodPipe } from '@app/common/pipe/zod.pipe';
import { UserService } from './user.service';
import { CreateUserDto, createUserSchema } from './dtos/create-user.dto';
import { CreateUserResponseDto } from './dtos/create-user-response.dto';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiCreatedResponse({ type: CreateUserResponseDto })
  @Post('register')
  async register(@Body(new ZodPipe(createUserSchema)) createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    const user = await this.userService.createUser(this.toUser(createUserDto));
    return new CreateUserResponseDto(user);
  }

  private toUser(dto: CreateUserDto) {
    const user = new User();
    user.name = dto.name;
    user.email = dto.email;
    user.password = dto.password;

    return user;
  }
}
