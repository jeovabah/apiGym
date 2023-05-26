export class CreateUserDto {
  id?: string;
  name: string;
  password: string;
  level?: number;
  phoneWpp: string | null;
  photoLink?: string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
