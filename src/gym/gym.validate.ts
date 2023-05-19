import { GymsDTO } from './gym.dto';

export const validateRequestCreateGym = (body: GymsDTO) => {
  const { name, address } = body;

  if (!name) {
    throw new Error('Nome é obrigatório');
  }

  if (!address) {
    throw new Error('Endereço é obrigatório');
  }

};
