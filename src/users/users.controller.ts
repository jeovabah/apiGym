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
      throw 'Erro interno';
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
      throw 'Erro interno';
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() response: Response,
  ) {
    try {
      const user = await this.usersService.update(id, updateUserDto);
      return response.status(200).json(user);
    } catch (e) {
      throw 'Erro interno';
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post('photoUpdate')
  @UseInterceptors(FileInterceptor('photoLink'))
  async photoUpdate(
    @UploadedFile() file,
    @Body() request: Request,
    @Res() response: Response,
  ) {
    try {
      const photoUser = await this.usersService.updatePhoto(file, request);

      return response.status(200).json(photoUser);
    } catch (e) {
      throw 'Erro interno';
    }
  }
}
