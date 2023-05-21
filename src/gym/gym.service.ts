import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GymsDTO } from './gym.dto';
import { validateRequestCreateGym } from './gym.validate';

@Injectable()
export class GymService {
  constructor(private prisma: PrismaService) {}
  async getGyms(): Promise<any> {
    const result = await this.prisma.gym.findMany({
      include: {
        Profesionals: {
          include: {
            profesional: true,
          },
        },
      },
    });

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
        latitude: data?.latitude,
        longitude: data?.longitude,
        description: data?.description,
        website: data?.website || '',
        cupomActive: data?.cupomActive || false,
        logo: data?.logo,
        phoneWpp: data?.phoneWpp,
        instagram: data?.instagram,
        valueMonth: data?.valueMonth,
        anualStart: data?.anualStart,
        details1: data?.details1,
        details2: data?.details2,
        details3: data?.details3,
        details4: data?.details4,
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
        latitude: data?.latitude,
        longitude: data?.longitude,
        description: data?.description,
        website: data?.website || '',
        cupomActive: data?.cupomActive || false,
        logo: data?.logo,
        phoneWpp: data?.phoneWpp,
        instagram: data?.instagram,
        valueMonth: data?.valueMonth,
        anualStart: data?.anualStart,
        details1: data?.details1,
        details2: data?.details2,
        details3: data?.details3,
        details4: data?.details4,
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
