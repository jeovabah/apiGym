import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Response, response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
  ) {
    try {
      const user = await this.usersService.create(createUserDto);
      return response.status(200).json(user);
    } catch (e) {
      console.log(e);
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post('phone')
  async findOne(@Body() body: any, @Res() response: Response) {
    try {
      const user = await this.usersService.findOne(body);
      return response.status(200).json(user);
    } catch (error) {
      console.log(error);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = this.usersService.update(id, updateUserDto);
      return response.status(200).json(user);
    } catch (e) {
      console.log(e);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post('photoUpdate')
  @UseInterceptors(FileInterceptor('photoLink'))
  photoUpdate(@UploadedFile() file, @Param('id') id: string) {
    try {
      const photoUser = this.usersService.updatePhoto(file, { id });

      return response.status(200).json(photoUser);
    } catch (e) {
      console.log(e);
    }
  }
}
