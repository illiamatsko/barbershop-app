import { BarbershopDto } from '@barbershop-app/shared/domain';

export interface BarbershopState {
  barbershops: BarbershopDto[]
  barbersByBarbershopId: Record<number, number[]>
}

export const initialBarbershopState: BarbershopState = {
  barbershops: [],
  barbersByBarbershopId: {}
};
