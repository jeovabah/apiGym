import { Injectable } from '@nestjs/common';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AlertsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createAlertDto: CreateAlertDto) {
    const alert = await this.prisma.postDinamically.create({
      data: createAlertDto,
    });

    return alert;
  }

  findAll() {
    return `This action returns all alerts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} alert`;
  }

  async findLastUpdated() {
    const alerts = await this.prisma.postDinamically.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 1,
    });

    return alerts;
  }

  async update(id: string, updateAlertDto: UpdateAlertDto) {
    const alert = await this.prisma.postDinamically.update({
      where: {
        id: id,
      },
      data: updateAlertDto,
    });

    return alert;
  }

  remove(id: number) {
    return `This action removes a #${id} alert`;
  }
}
