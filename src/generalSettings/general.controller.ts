import { Body, Controller, Get, Patch, Post, Res } from '@nestjs/common';
import { NotificationDTO, storageDTO } from './general.dto';
import { Response } from 'express';
import { GeneralService } from './general.service';

@Controller('generalSettings')
export class GeneralController {
  constructor(private notificationService: GeneralService) {}

  @Get()
  async getGeneralSettings(
    @Res() response: Response,
    @Body() body: storageDTO,
  ): Promise<any> {
    try {
      const generalSettings =
        await this.notificationService.getGeneralSettings();

      return response.status(200).json({
        generalSettings,
        message: 'Configuracoes gerais!',
      });
    } catch (e) {
      console.log(e);

      return response.status(400).json({
        message: e.message,
      });
    }
  }

  @Patch('/update')
  async updateGeneralSettings(
    @Res() response: Response,
    @Body() body: any,
  ): Promise<any> {
    try {
      const generalSettings =
        await this.notificationService.updateGeneralSettings(body);

      return response.status(200).json({
        generalSettings,
        message: 'Configuracoes gerais atualizadas!',
      });
    } catch (e) {
      console.log(e);

      return response.status(400).json({
        message: e.message,
      });
    }
  }

  @Post()
  async createGeneralSettings(
    @Res() response: Response,
    @Body() body: any,
  ): Promise<any> {
    try {
      const generalSettings =
        await this.notificationService.createGeneralSettings(body);

      return response.status(200).json({
        generalSettings,
        message: 'Configuracoes gerais criadas!',
      });
    } catch (e) {
      console.log(e);

      return response.status(400).json({
        message: e.message,
      });
    }
  }
}
