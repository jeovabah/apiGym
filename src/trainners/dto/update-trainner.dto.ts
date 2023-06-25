import { PartialType } from '@nestjs/mapped-types';
import { CreateTrainnerDto } from './create-trainner.dto';

export class UpdateTrainnerDto extends PartialType(CreateTrainnerDto) {}
