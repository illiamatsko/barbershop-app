import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { initialServiceState, ServiceState } from './service.state';
import { setServices } from './service.updaters';

export const ServiceStore = signalStore(
  { providedIn: 'root' },
  withState<ServiceState>(initialServiceState),
  withMethods(store => ({
    setServices: (res: ServiceState) => patchState(store, setServices(res)),
  }))
);
