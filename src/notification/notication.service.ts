import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { NotificationDTO } from './notification.dto';
import { Expo } from 'expo-server-sdk';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService, private expo: Expo) {
    this.expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
  }

  async storageDeviceToken(body: any): Promise<any> {
    const { token } = body;
    console.log(token);
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
      const deviceToken = await this.prisma.deviceTokenExpo.findMany();

      return deviceToken;
    } catch (e) {
      console.log(e);
    }
  }

  async sendNotification(request: NotificationDTO): Promise<any> {
    try {
      const { title, body } = request;
      const deviceTokens = await this.getDeviceTokens();

      const tokens = deviceTokens.map((token) => token.token);

      const messages = [];

      for (let pushToken of tokens) {
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

      let chunks = this.expo.chunkPushNotifications(messages);
      let tickets = [];
      (async () => {
        for (let chunk of chunks) {
          try {
            let ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
            console.log(ticketChunk);
            tickets.push(...ticketChunk);
          } catch (error) {
            console.error(error);
          }
        }
      })();
    } catch (e) {
      console.log(e);
    }
  }
}
