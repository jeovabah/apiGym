export class CreateUserDto {
  id?: string;
  name: string;
  password: string;
  level?: number;
  phoneWpp: string | null;
  activity?: string | null;
  frequency_space?: string | null;
  instagram?: string | null;
  space?: string | null;
  text_motivational?: string | null;
  photoLink?: string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
