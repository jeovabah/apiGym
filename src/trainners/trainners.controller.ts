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
import { TrainnersService } from './trainners.service';
import { CreateTrainnerDto } from './dto/create-trainner.dto';
import { UpdateTrainnerDto } from './dto/update-trainner.dto';
import { Response } from 'express';

@Controller('trainners')
export class TrainnersController {
  constructor(private readonly trainnersService: TrainnersService) {}

  @Post()
  async create(
    @Body() createTrainnerDto: CreateTrainnerDto,
    @Res() response: Response,
  ) {
    try {
      const trainner = await this.trainnersService.create(createTrainnerDto);
      return response.status(200).json({
        trainner,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Post(':id/actuation')
  async createActuation(
    @Param('id') id: string,
    @Body() actuationData: any,
    @Res() response: Response,
  ) {
    try {
      const actuation = await this.trainnersService.createActuation(
        id,
        actuationData,
      );
      return response.status(200).json({
        actuation,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Get()
  async findAll(@Res() response: Response) {
    try {
      const trainner = await this.trainnersService.findAll();
      return response.status(200).json({
        trainner,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    try {
      const trainner = await this.trainnersService.findOne(id);
      return response.status(200).json({
        trainner,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTrainnerDto: UpdateTrainnerDto,
    @Res() response: Response,
  ) {
    try {
      const trainner = await this.trainnersService.update(
        id,
        updateTrainnerDto,
      );
      return response.status(200).json({
        trainner,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response: Response) {
    try {
      const trainner = await this.trainnersService.remove(id);
      return response.status(200).json({
        trainner,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
