export class CreateTrainnerDto {
  id?: string;
  name: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  trainnerDetails?: any;
  actuation?: any;
  actuationId?: string;
  occupation: string;
  experience?: string;
}
