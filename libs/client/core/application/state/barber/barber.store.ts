import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { initialBarberState, BarberState } from './barber.state';
import { setBarbers } from './barber.updaters';

export const BarberStore = signalStore(
  { providedIn: 'root' },
  withState<BarberState>(initialBarberState),
  withMethods(store => ({
    setBarbers: (res: BarberState) => patchState(store, setBarbers(res)),
  }))
);
