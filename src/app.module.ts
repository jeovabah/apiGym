import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GymModule } from './gym/gym.module';
import { PrismaService } from './prisma.service';
import { NotificationModule } from './notification/notification.module';
import { APP_GUARD } from '@nestjs/core';
import { GlobalAuthGuard } from './global.auth';
import { UsersModule } from './users/users.module';
import { CommunitiesModule } from './communities/communities.module';
import { TrainnersModule } from './trainners/trainners.module';
import { AlertsModule } from './alerts/alerts.module';
import { GeneralModule } from './generalSettings/general.module';

@Module({
  imports: [
    GymModule,
    NotificationModule,
    GeneralModule,
    UsersModule,
    CommunitiesModule,
    TrainnersModule,
    AlertsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
