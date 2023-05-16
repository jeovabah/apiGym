import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GymModule } from './gym/gym.module';
import { PrismaService } from './prisma.service';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [GymModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
