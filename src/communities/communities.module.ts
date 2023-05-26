import { Module } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { CommunitiesController } from './communities.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CommunitiesController],
  providers: [CommunitiesService, PrismaService],
})
export class CommunitiesModule {}
