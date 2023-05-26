import { Module } from '@nestjs/common';
import { GymController } from './gym.controller';
import { GymService } from './gym.service';
import { PrismaService } from 'src/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { GlobalAuthGuard } from 'src/global.auth';

@Module({
  imports: [],
  controllers: [GymController],
  providers: [GymService, PrismaService],
})
export class GymModule {}
