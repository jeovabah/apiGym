import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { Response } from 'express';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Post()
  async create(
    @Body() createAlertDto: CreateAlertDto,
    @Res() response: Response,
  ) {
    const alert = await this.alertsService.create(createAlertDto);

    return response.status(201).json({
      ok: true,
      alert,
    });
  }

  @Get()
  async findLastUpdated(@Res() response: Response) {
    try {
      const alerts = await this.alertsService.findLastUpdated();

      return response.status(200).json({
        ok: true,
        alerts,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alertsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAlertDto: UpdateAlertDto,
    @Res() response: Response,
  ) {
    try {
      const alert = await this.alertsService.update(id, updateAlertDto);

      return response.status(200).json({
        ok: true,
        alert,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alertsService.remove(+id);
  }
}
