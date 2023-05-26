import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';

@Controller('communities')
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Post(':id/like')
  like(@Param('id') id: string) {
    return this.communitiesService.like(id);
  }

  // Post a new community
  @Post()
  create(@Body() createCommunityDto: CreateCommunityDto) {
    return this.communitiesService.create(createCommunityDto);
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
