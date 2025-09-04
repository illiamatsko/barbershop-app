import {
  BookingFlowState,
  initialBookingFlowState,
} from './booking-flow.state';
import {
  getState,
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState
} from '@ngrx/signals';
import { computed, effect, inject, untracked } from '@angular/core';
import {
  filterBarbers,
  filterBarbershops,
  filterServices,
} from './booking-flow.filters';
import { ActivatedRoute, Router } from '@angular/router';
import { withEffects } from '@ngrx/signals/events';
import { BarbershopStore, BarberStore, ServiceStore } from '@barbershop-app/client/core/application';
import {UrlQueryManager} from "../managers/url-query.manager";


export const BookingFlowStore = signalStore(
  { providedIn: 'root' },
  withState<BookingFlowState>(initialBookingFlowState),

  withComputed((store) => {
    const barbers = inject(BarberStore).barbers;
    const barbershops = inject(BarbershopStore).barbershops;
    const services = inject(ServiceStore).services;

    return {
      availableBarbershops: computed(() => {
        const serviceId = store.serviceId();
        // console.log(
        //   'computing barbershops',
        //   filterBarbershops(barbershops(), barbers(), serviceId)
        // );

        return filterBarbershops(barbershops(), barbers(), serviceId);
      }),

      availableBarbers: computed(() => {
        const serviceId = store.serviceId();
        const barbershopId = store.barbershopId();
        // console.log(1,
        //   'computing barbers',
        //   serviceId, barbershopId
        // );

        return filterBarbers(
          barbers(),
          serviceId,
          barbershopId
        );
      }),

      availableServices: computed(() => {
        const barberId = store.barberId();
        const barbershopId = store.barbershopId();
        // console.log(
        //   'computing services',
        //   filterServices(services(), barbers(), barberId)
        // );

        return filterServices(services(), barbers(), barberId, barbershopId);
      })
    };
  }),

  withMethods((store) => {
    const route = inject(ActivatedRoute);
    const router = inject(Router);

    return {
      toggleSelectBarbershop: (barbershopId: number) => {
        const currentState = getState(store);
        let newBarbershopId: number | null = barbershopId;

        if(currentState.barbershopId && currentState.barbershopId === barbershopId) {
          newBarbershopId = null;
        }

        router.navigate([], {
          relativeTo: route,
          queryParams: { barbershopId: newBarbershopId },
          replaceUrl: true
        }).then();
      },


      toggleSelectBarber: (barberId: number) => {
        const currentState = getState(store);
        let newBarberId: number | null = barberId;

        if(currentState.barberId && currentState.barberId === barberId) {
          newBarberId = null;
        }

        router.navigate([], {
          queryParams: { barberId: newBarberId },
          queryParamsHandling: 'merge',
        }).then();
      },

      toggleSelectService: (serviceId: number) => {
        const currentState = getState(store);
        let newServiceId: number | null = serviceId;

        if(currentState.serviceId && currentState.serviceId === serviceId) {
          newServiceId = null;
        }

        router.navigate([], {
          queryParams: { serviceId: newServiceId },
          queryParamsHandling: 'merge',
        }).then();
      },
    };
  }),

  withEffects((store) => {
    const router = inject(Router);
    const urlQueryManager = inject(UrlQueryManager);

    effect(() => {
      const params = urlQueryManager.params();
      const currenState = untracked(() => getState(store));
      if (!params || !urlQueryManager.isReady()) return;

      const next = urlQueryManager.setParams(params, currenState);
      console.log('current', currenState)
      console.log('next:', next)
      console.log('')
      patchState(store, next);
      router.navigate([], {
        queryParams: next
      }).then();
    });

    return {};
  })
);
