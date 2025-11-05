import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { initialServiceState, ServiceState } from './service.state';
import { ServiceDto } from '@barbershop-app/shared/domain';

export const ServiceStore = signalStore(
  { providedIn: 'root' },
  withState<ServiceState>(initialServiceState),
  withMethods((store) => ({
    setServices: (services: ServiceDto[]) => patchState(store, { services }),

    addPricesByBarberId: (
      barberId: number,
      prices: { serviceId: number; price: number }[]
    ) => {
      const newMap = new Map(store.pricesByBarberStatusId());
      newMap.set(barberId, prices);
      patchState(store, { pricesByBarberStatusId: newMap });
    },
  }))
);
