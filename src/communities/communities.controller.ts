import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  HttpException,
} from '@nestjs/common';
import { CommunitiesService, PropsCommunity } from './communities.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('communities')
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Post('/like')
  async like(@Body() request: { id: string; userId: string }) {
    try {
      const response = await this.communitiesService.like(request);
      return new HttpException(response, 200);
    } catch (e) {
      throw new HttpException(e.message, 400);
    }
  }

  // Post a new community
  @Post()
  @UseInterceptors(FileInterceptor('photoLink'))
  async create(
    @UploadedFile() file,
    @Body() createCommunityDto: PropsCommunity,
  ) {
    const response = await this.communitiesService.create(
      file,
      createCommunityDto,
    );

    return response;
  }

  // Get all communities
  @Get()
  findAll() {
    return this.communitiesService.findAll();
  }

  // Get a specific community by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.communitiesService.findOne(id);
  }

  // Update a specific community by ID
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommunityDto: UpdateCommunityDto,
  ) {
    return this.communitiesService.update(id, updateCommunityDto);
  }

  // Delete a specific community by ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.communitiesService.remove(id);
  }

  // Get comments for a specific community by ID
  @Get(':id/comments')
  getComments(@Param('id') id: string) {
    return this.communitiesService.getComments(id);
  }

  // Post a comment for a specific community by ID
  @Post(':id/comments')
  createComment(@Param('id') id: string, @Body() commentDto: any) {
    return this.communitiesService.createComment(id, commentDto);
  }
}
