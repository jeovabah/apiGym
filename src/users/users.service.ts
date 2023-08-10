import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { ImageFirebase } from 'src/Helpers';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        password: createUserDto.password,
        phoneWpp: createUserDto.phoneWpp,
        activity: createUserDto.activity ?? null,
        frequency_space: createUserDto.frequency_space ?? null,
        instagram: createUserDto.instagram ?? null,
        space: createUserDto.space ?? null,
        text_motivational: createUserDto.text_motivational ?? null,
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

  async updatePhoto(file: any, body) {
    let photoURL = '';

    const { id } = body;
    if (file) {
      photoURL = await ImageFirebase(file);
    }

    const user = await this.prisma.user.update({
      where: { id: id },
      data: {
        photoLink: photoURL,
      },
    });

    return user;
  }
}
