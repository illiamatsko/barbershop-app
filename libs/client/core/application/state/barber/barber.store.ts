import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { initialBarberState, BarberState } from './barber.state';
import { setBarbers } from './barber.updaters';
import { BarberSummaryDto } from '@barbershop-app/shared/domain';

export const BarberStore = signalStore(
  { providedIn: 'root' },
  withState<BarberState>(initialBarberState),
  withMethods((store) => {
    return {
      setBarbers: (barbers: BarberSummaryDto[]) =>
        patchState(store, (state) => setBarbers(state, barbers))
    }
  })
);
