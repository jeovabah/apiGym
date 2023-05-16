import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GymsDTO } from './gym.dto';
import { validateRequestCreateGym } from './gym.validate';

@Injectable()
export class GymService {
  constructor(private prisma: PrismaService) {}
  async getGyms(): Promise<any> {
    console.log('chegando aqui');
    const result = await this.prisma.gym.findMany({});
    console.log(result);
    if (!result) {
      throw new Error('No gyms found');
    }
    return result;
  }

  async createGym(data: GymsDTO): Promise<any> {
    validateRequestCreateGym(data);
    const result = await this.prisma.gym.create({
      data: {
        address: data?.address,
        name: data?.name,
        avaliation: data?.avaliation ?? '5',
        description: data?.description,
        content: data?.content ?? '',
        phone: data?.phone,
        website: data?.website || '',
      },
    });
    if (!result) {
      throw new Error('Academia não cadastrada');
    }
    return result;
  }

  async updateGym(data: GymsDTO): Promise<any> {
    const result = await this.prisma.gym.update({
      where: {
        id: data?.id,
      },
      data: {
        address: data?.address,
        name: data?.name,
        avaliation: data?.avaliation,
        description: data?.description,
        content: data?.content,
        phone: data?.phone,
        website: data?.website,
      },
    });
    if (!result) {
      throw new Error('Academia não atualizada');
    }
    return result;
  }

  async deleteGym(data: GymsDTO): Promise<any> {
    const result = await this.prisma.gym.delete({
      where: {
        id: data?.id,
      },
    });
    if (!result) {
      throw new Error('Academia não deletada');
    }
    return result;
  }
}
