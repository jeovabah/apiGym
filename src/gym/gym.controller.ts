import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { GymService } from './gym.service';
import { Response } from 'express';
import { GymsDTO } from './gym.dto';

@Controller('gym')
export class GymController {
  constructor(private readonly gymservice: GymService) {}

  @Get()
  async getGyms(@Res() response: Response): Promise<any> {
    try {
      console.log('cehgando na controller');
      const gyms = await this.gymservice.getGyms();
      return response.status(200).json(gyms);
    } catch (e) {
      console.log(e);
    }
  }

  @Post('create')
  async createGym(
    @Res() response: Response,
    @Body() body: GymsDTO,
  ): Promise<any> {
    try {
      const gym = await this.gymservice.createGym(body);

      return response.status(200).json({
        gym,
      });
    } catch (e) {
      console.log(e);
    }
  }

  @Patch('update')
  async updateGym(
    @Res() response: Response,
    @Body() body: GymsDTO,
  ): Promise<any> {
    try {
      const gym = await this.gymservice.updateGym(body);

      return response.status(200).json({
        gym,
      });
    } catch (e) {
      console.log(e);
    }
  }

  @Delete('delete')
  async deleteGym(
    @Res() response: Response,
    @Body() body: GymsDTO,
  ): Promise<any> {
    try {
      const gym = await this.gymservice.deleteGym(body);

      return response.status(200).json({
        gym,
      });
    } catch (e) {
      console.log(e);
    }
  }
}
