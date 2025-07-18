import { BarberState } from './barber.state';

export function setBarbers(res: BarberState): BarberState {
  return {
    barbers: res.barbers
  }
}
