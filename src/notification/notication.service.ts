import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { NotificationDTO } from './notification.dto';
import { Expo } from 'expo-server-sdk';
import { keyFirebase } from 'src/docs/appgym-key';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService, private expo: Expo) {
    this.expo = new Expo({ accessToken: keyFirebase.private_key });
  }

  async storageDeviceToken(body: any): Promise<any> {
    const { token } = body;
    const deviceTokens = await this.getDeviceTokens();
    if (deviceTokens.length > 0) {
      for (let deviceToken of deviceTokens) {
        if (deviceToken.token === token) {
          throw new Error('Token já cadastrado!');
        }
      }
    }
    const deviceToken = await this.prisma.deviceTokenExpo.create({
      data: {
        token,
      },
    });

    return deviceToken;
  }

  async getDeviceTokens(): Promise<any> {
    try {
      const deviceTokens = await this.prisma.deviceTokenExpo.findMany();
      return deviceTokens;
    } catch (e) {
      console.log(e);
    }
  }

  async sendNotification(request: NotificationDTO): Promise<any> {
    try {
      const { title, body } = request;
      const deviceTokens = await this.getDeviceTokens();

      const messages = [];

      for (let deviceToken of deviceTokens) {
        const pushToken = deviceToken.token;

        if (!Expo.isExpoPushToken(pushToken)) {
          console.error(
            `Push token ${pushToken} is not a valid Expo push token`,
          );
          continue;
        }

        messages.push({
          to: pushToken,
          sound: 'default',
          title: title,
          body: body,
          data: { someData: 'goes here' },
        });
      }

      const chunks = this.expo.chunkPushNotifications(messages);
      const tickets = [];

      for (const chunk of chunks) {
        try {
          const ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
          tickets.push(...ticketChunk);
        } catch (error) {
          console.error(error);
        }
      }

      console.log('Successfully sent notifications:', tickets);
    } catch (e) {
      console.log(e);
    }
  }
}
