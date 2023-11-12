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

  async sendNotificationFirebase(request: NotificationDTO): Promise<any> {
    try {
      const { title, body } = request;
      const deviceTokens = await this.getDeviceTokens();

      const messages: admin.messaging.Message[] = [];
      for (let deviceToken of deviceTokens) {
        // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]
        let pushToken = deviceToken.token;
        messages.push({
          notification: {
            title: title,
            body: body,
          },
          token: pushToken,
        });
      }

      const response = await admin
        .messaging()
        .sendEach(messages)
        .then((response) => {})
        .catch((error) => {
          console.log('Error sending message:', error);
        });
    } catch (e) {
      console.log('Error sending notifications catch:', e);
    }
  }

  async storageNotification(request: NotificationDTO): Promise<any> {
    const { title, body } = request;
    const notification = await this.prisma.notification.create({
      data: {
        title,
        body,
      },
    });

    return notification;
  }

  async getNotifications(): Promise<any> {
    try {
      const notifications = await this.prisma.notification.findMany();
      return notifications;
    } catch (e) {
      console.log(e);
    }
  }
}
