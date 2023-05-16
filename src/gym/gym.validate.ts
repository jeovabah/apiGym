import { GymsDTO } from './gym.dto';

export const validateRequestCreateGym = (body: GymsDTO) => {
  const { name, address, phone } = body;

  if (!name) {
    throw new Error('Nome é obrigatório');
  }

  if (!address) {
    throw new Error('Endereço é obrigatório');
  }

  if (!phone) {
    throw new Error('Telefone é obrigatório');
  }
};
