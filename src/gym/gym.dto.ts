export interface GymsDTO {
  id?: string;
  name: string;
  address: string;
  latitude?: number;
  longitude?: number;
  valueMonth?: number;
  description?: string;
  phoneWpp?: string;
  instagram?: string;
  cupomActive?: boolean;
  logo?: string;
  website?: string;
  anualStart: string;
  details1?: string;
  details2?: string;
  details3?: string;
  details4?: string;
  images?: string[];
  shifts?: ShiftsDTO[];
  listPrices?: PricesDTO[];
}

interface ShiftsDTO {
  id?: string;
  day: string;
  shift: string;
  gymId?: string;
}

interface PricesDTO {
  id?: string;
  price: number;
  name: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
