import { Injectable } from '@nestjs/common';
import { CreateTrainnerDto } from './dto/create-trainner.dto';
import { UpdateTrainnerDto } from './dto/update-trainner.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TrainnersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTrainnerDto: CreateTrainnerDto) {
    const trainner = await this.prisma.trainner.create({
      data: createTrainnerDto,
    });

    return trainner;
  }

  async createActuation(trainnerId: string, actuationData: any) {
    const actuation = await this.prisma.actuation.create({
      data: {
        ...actuationData,
        trainner: {
          connect: {
            id: trainnerId,
          },
        },
      },
    });

    return actuation;
  }

  async updateActuation(id: string, actuationId: string) {
    const trainner = await this.prisma.trainner.update({
      where: {
        id: id,
      },
      data: {
        actuation: {
          connect: {
            id: actuationId,
          },
        },
      },
    });

    return trainner;
  }

  async findAll() {
    const trainners = await this.prisma.trainner.findMany({
      include: {
        actuation: true,
      },
    });

    return trainners;
  }

  async findOne(id: string) {
    const trainner = await this.prisma.trainner.findUnique({
      where: {
        id: id,
      },
      include: {
        actuation: true,
      },
    });

    return trainner;
  }

  async update(id: string, updateTrainnerDto: UpdateTrainnerDto) {
    const updatedTrainner = await this.prisma.trainner.update({
      where: {
        id: id,
      },
      data: updateTrainnerDto,
    });

    return updatedTrainner;
  }

  async remove(id: string) {
    const trainner = await this.prisma.trainner.delete({
      where: {
        id,
      },
    });

    return trainner;
  }
}
