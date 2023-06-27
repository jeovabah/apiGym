import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { NotificationDTO } from './notification.dto';
import { Expo, ExpoPushMessage } from 'expo-server-sdk';
import { keyFirebase } from 'src/docs/appgym-key';
import * as admin from 'firebase-admin';

@Injectable()
export class NotificationService {
  private expo = new Expo();
  constructor(private prisma: PrismaService) {}

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

      const messages: ExpoPushMessage[] = [];
      for (let deviceToken of deviceTokens) {
        // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]
        let pushToken = deviceToken.token;
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
          data: { withSome: 'data' },
        });
      }

      let chunks = this.expo.chunkPushNotifications(messages);
      let tickets = [];
      for (let chunk of chunks) {
        try {
          let ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
          tickets.push(...ticketChunk);
          // NOTE: If a ticket contains an error code in ticket.details.error, you must handle it appropriately.
          console.log(ticketChunk);
        } catch (error) {
          console.error(error);
        }
      }
    } catch (e) {
      console.log('Error sending notifications:', e);
    }
  }
}
