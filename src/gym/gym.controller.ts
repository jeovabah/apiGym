import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { GymService } from './gym.service';
import { Response } from 'express';
import { GymsDTO } from './gym.dto';
import { GlobalAuthGuard } from 'src/global.auth';

@Controller('gym')
export class GymController {
  constructor(private readonly gymservice: GymService) {}
  @Get()
  // @UseGuards(GlobalAuthGuard) // Deixando o endpoint privado
  async getGyms(@Res() response: Response): Promise<any> {
    try {
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

  @Post('delete')
  async deleteGym(
    @Res() response: Response,
    @Body() body: GymsDTO,
  ): Promise<any> {
    try {
      console.log(body);
      const gym = await this.gymservice.deleteGym(body);

      return response.status(200).json({
        gym,
      });
    } catch (e) {
      console.log(e);
    }
  }

  @Get('profesional')
  async getProfesional(@Res() response: Response): Promise<any> {
    try {
      const gyms = await this.gymservice.getProfesionals();
      return response.status(200).json(gyms);
    } catch (e) {
      console.log(e);
    }
  }

  @Post('profesional/create')
  async profesionalCreate(
    @Res() response: Response,
    @Body() body: any,
  ): Promise<any> {
    try {
      const gym = await this.gymservice.profesionalCreate(body);

      return response.status(200).json({
        gym,
      });
    } catch (e) {
      console.log(e);
    }
  }

  @Post('profesional/delete')
  async profesionalDelete(
    @Res() response: Response,
    @Body() body: any,
  ): Promise<any> {
    try {
      const gym = await this.gymservice.profesionalDelete(body);

      return response.status(200).json({
        gym,
      });
    } catch (e) {
      console.log(e);
    }
  }

  @Patch('profesional/update')
  async profesionalUpdate(@Res() response: Response, @Body() body: any) {
    try {
      const gym = await this.gymservice.profesionalUpdate(body);

      return response.status(200).json({
        gym,
      });
    } catch (e) {
      console.log(e);
    }
  }
}
