import { Module } from '@nestjs/common';
import { TrainnersService } from './trainners.service';
import { TrainnersController } from './trainners.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TrainnersController],
  providers: [TrainnersService, PrismaService],
})
export class TrainnersModule {}
