import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notication.service';
import Expo from 'expo-server-sdk';

@Module({
  imports: [],
  controllers: [NotificationController],
  providers: [NotificationService, PrismaService, Expo],
})
export class NotificationModule {}
