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
import { Router } from '@angular/router';
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
        // console.log(
        //   'computing services',
        //   filterServices(services(), barbers(), barberId)
        // );

        return filterServices(services(), barbers(), barberId);
      })
    };
  }),

  withMethods((store) => {
    const router = inject(Router);

    return {
      toggleSelectBarbershop: (barbershopId: number) => {
        const currentState = getState(store);
        // const nextParams = barbershopUpdater(currentState, barbershopId);
        const nextParams = { ...currentState, barbershopId }

        router.navigate([], {
          queryParams: nextParams,
          queryParamsHandling: 'merge',
        }).then();
      },


      toggleSelectBarber: (barberId: number) => {
        const currentState = getState(store);
        // const nextParams = barberUpdater(currentState, barbers(), barberId);
        const nextParams = { ...currentState, barberId }

        router.navigate([], {
          queryParams: nextParams,
          queryParamsHandling: 'merge',
        }).then();
      },

      toggleSelectService: (serviceId: number) => {
        const currentState = getState(store);
        // const nextParams = serviceUpdater(currentState, serviceId);
        const nextParams = { ...currentState, serviceId }

        router.navigate([], {
          queryParams: nextParams,
          queryParamsHandling: 'merge',
        }).then();
      },
    };
  }),

  withEffects((store) => {
    const router = inject(Router);
    const urlQueryManager = inject(UrlQueryManager);

    const stateChanged = (oldState: BookingFlowState, newState: BookingFlowState) => {
      return oldState.barbershopId === newState.barbershopId &&
        oldState.barberId === newState.barberId &&
        oldState.serviceId === newState.serviceId
    }

    effect(() => {
      const params = urlQueryManager.params();
      const currenState = untracked(() => getState(store));
      if (!params) return;

      const next = urlQueryManager.setParams(params, currenState);
      console.log('current', currenState)
      console.log('next:', next)
      console.log('')
      if (!stateChanged(currenState, next)) {
        console.log('change')
        router.navigate([], {
          queryParams: next
        }).then();
        patchState(store, next);
      }
    });

    return {};
  })
);
