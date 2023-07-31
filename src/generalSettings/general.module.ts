import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GeneralController } from './general.controller';
import { GeneralService } from './general.service';
import Expo from 'expo-server-sdk';

@Module({
  imports: [],
  controllers: [GeneralController],
  providers: [GeneralService, PrismaService, Expo],
})
export class GeneralModule {}
