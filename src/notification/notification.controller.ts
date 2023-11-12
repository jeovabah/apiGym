import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { NotificationDTO, storageDTO } from './notification.dto';
import { Response } from 'express';
import { NotificationService } from './notication.service';

@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}

  @Post('storageDeviceToken')
  async storageDeviceToken(
    @Res() response: Response,
    @Body() body: storageDTO,
  ): Promise<any> {
    try {
      const deviceToken = await this.notificationService.storageDeviceToken(
        body,
      );

      return response.status(200).json({
        deviceToken,
        message: 'Device token inserido com sucesso!',
      });
    } catch (e) {
      console.log(e);

      return response.status(400).json({
        message: e.message,
      });
    }
  }

  @Post('sendNotificationAll')
  async sendNotification(
    @Res() response: Response,
    @Body() body: NotificationDTO,
  ): Promise<any> {
    try {
      const deviceToken =
        await this.notificationService.sendNotificationFirebase(body);

      return response.status(200).json({
        deviceToken,
        message: 'Notificação enviada com sucesso!',
      });
    } catch (e) {
      console.log(e);

      return response.status(400).json({
        message: e.message,
      });
    }
  }

  @Get('getNotifications')
  async getNotifications(@Res() response: Response): Promise<any> {
    try {
      const notifications = await this.notificationService.getNotifications();

      return response.status(200).json({
        data: notifications,
        message: 'Notificações encontradas com sucesso!',
      });
    } catch (e) {
      console.log(e);

      return response.status(400).json({
        message: e.message,
      });
    }
  }
}
