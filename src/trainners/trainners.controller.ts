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

  @Patch(':id/actuation/:actuationId')
  async updateActuation(
    @Param('id') id: string,
    @Param('actuationId') actuationId: string,
    @Body() actuationData: any,
    @Res() response: Response,
  ) {
    try {
      const trainner = await this.trainnersService.updateActuation(
        id,
        actuationId,
        actuationData,
      );
      return response.status(200).json({
        trainner,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Get('all/actuations')
  async findAllActuations(@Res() response: Response) {
    try {
      const actuations = await this.trainnersService.findAllActuations();
      return response.status(200).json({
        actuations,
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
      console.log('error');
      throw error;
    }
  }

  @Delete(':id/actuation/')
  async removeActuation(@Param('id') id: string, @Res() response: Response) {
    try {
      const trainner = await this.trainnersService.removeActuation(id);
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

  @Post('like')
  async handleLiked(
    @Body()
    data: {
      id: string;
      liked?: boolean | null;
    },
    @Res() response: Response,
  ) {
    try {
      const liked = await this.trainnersService.handleLiked(data);

      return response.status(200).json({
        liked,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
