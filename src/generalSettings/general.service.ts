import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { NotificationDTO } from './general.dto';
import { Expo, ExpoPushMessage } from 'expo-server-sdk';
import { keyFirebase } from 'src/docs/appgym-key';
import * as admin from 'firebase-admin';

@Injectable()
export class GeneralService {
  constructor(private prisma: PrismaService) {}

  async getGeneralSettings(): Promise<any> {
    const generalSettings = await this.prisma.generalSettings.findFirst();
    return generalSettings;
  }

  async createGeneralSettings(body): Promise<any> {
    const generalSettings = await this.prisma.generalSettings.create({
      data: body,
    });

    return generalSettings;
  }

  async updateGeneralSettings(body): Promise<any> {
    const generalSetting = await this.prisma.generalSettings.findFirst();

    const generalSettingUpdate = await this.prisma.generalSettings.update({
      where: {
        id: body.id,
      },
      data: {
        contactWppGym: body?.contactWppGym || generalSetting?.contactWppGym,
        contactWppTrainner:
          body?.contactWppTrainner || generalSetting?.contactWppTrainner,
      },
    });

    return generalSettingUpdate;
  }
}
