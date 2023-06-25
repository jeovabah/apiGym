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
        shifts: true,
        listPrices: true,
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
        shifts: {
          create: data?.shifts,
        },
        images: data?.images,
        listPrices: {
          create: data?.listPrices,
        },
      },
    });
    if (!result) {
      throw new Error('Academia não cadastrada');
    }
    return result;
  }

  async updateGym(data: GymsDTO): Promise<any> {
    if (data?.shifts?.length > 0) {
      // Verificar se existem registros relacionados na tabela Shift
      const shifts = await this.prisma.shift.findMany({
        where: {
          gymId: data.id,
        },
      });

      if (shifts.length > 0) {
        await this.prisma.shift.deleteMany({
          where: {
            gymId: data.id,
          },
        });
      }
    }

    if (data?.listPrices?.length > 0) {
      // Verificar se existem registros relacionados na tabela ListPrice
      const listPrices = await this.prisma.prices.findMany({
        where: {
          gymId: data.id,
        },
      });

      if (listPrices.length > 0) {
        await this.prisma.prices.deleteMany({
          where: {
            gymId: data.id,
          },
        });
      }
    }

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
        shifts: {
          create: data?.shifts,
        },
        images: data?.images,
        listPrices: {
          create: data?.listPrices,
        },
      },
    });
    if (!result) {
      throw new Error('Academia não atualizada');
    }
    return result;
  }

  async deleteGym(data: GymsDTO): Promise<any> {
    // Verificar se existem registros relacionados na tabela GymProfesional
    const gymProfesionals = await this.prisma.gymProfesional.findMany({
      where: {
        gymId: data.id,
      },
    });

    // Remover registros relacionados na tabela GymProfesional
    if (gymProfesionals.length > 0) {
      await this.prisma.gymProfesional.deleteMany({
        where: {
          gymId: data.id,
        },
      });
    }

    // Verificar se existem registros relacionados na tabela GymShift
    const gymShifts = await this.prisma.shift.findMany({
      where: {
        gymId: data.id,
      },
    });

    // Remover registros relacionados na tabela GymShift
    if (gymShifts.length > 0) {
      await this.prisma.shift.deleteMany({
        where: {
          gymId: data.id,
        },
      });
    }

    // Verificar se existem registros relacionados na tabela GymPrice
    const gymPrices = await this.prisma.prices.findMany({
      where: {
        gymId: data.id,
      },
    });

    if (gymPrices.length > 0) {
      await this.prisma.prices.deleteMany({
        where: {
          gymId: data.id,
        },
      });
    }

    // Excluir a academia
    const result = await this.prisma.gym.delete({
      where: {
        id: data.id,
      },
    });

    if (!result) {
      throw new Error('Academia não deletada');
    }

    return result;
  }

  async getProfesionals() {
    const result = await this.prisma.profesional.findMany({
      include: {
        Gyms: {
          include: {
            gym: true,
          },
        },
      },
    });

    if (!result) {
      throw new Error('Sem profissionais encontrados');
    }
    return result;
  }

  async profesionalCreateForGym(data: any) {
    const result = await this.prisma.gymProfesional.create({
      data: {
        gymId: data.gymId,
        profesionalId: data.profesionalId,
      },
    });

    if (!result) {
      throw new Error('Academia não cadastrada');
    }
    return result;
  }

  async profesionalCreate(data: any) {
    const result = await this.prisma.profesional.create({
      data: {
        name: data.name,
        phoneWpp: data.phoneWpp,
        photoLink: data.photoLink,
      },
    });

    const response = await this.profesionalCreateForGym({
      gymId: data.gymId,
      profesionalId: result.id,
    });

    if (!response) {
      throw new Error('Profissional não cadastrado');
    }

    if (!result || !response) {
      throw new Error('Profissional não cadastrado');
    }

    return result;
  }

  async profesionalDelete(data: any) {
    const response = await this.prisma.gymProfesional.deleteMany({
      where: {
        profesionalId: data.id,
      },
    });

    if (!response) {
      throw new Error('Profissional não deletado');
    }

    const result = await this.prisma.profesional.delete({
      where: {
        id: data.id,
      },
    });

    if (!result) {
      throw new Error('Profissional não deletado');
    }

    return result;
  }

  async profesionalUpdate(data: any) {
    const result = await this.prisma.profesional.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        phoneWpp: data.phoneWpp,
        photoLink: data.photoLink,
      },
    });

    if (!result) {
      throw new Error('Profissional não atualizado');
    }

    return result;
  }
}
