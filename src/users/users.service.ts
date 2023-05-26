import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        password: createUserDto.password,
        phoneWpp: createUserDto.phoneWpp,
      },
    });

    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(body: any) {
    const users = await this.prisma.user.findMany({
      where: {
        phoneWpp: body?.phoneWpp,
        password: body?.password,
      },
    });

    if (users.length === 0) {
      return {};
    }

    const user = users[0];

    console.log(user);

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id: id },
      data: updateUserDto,
    });

    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
