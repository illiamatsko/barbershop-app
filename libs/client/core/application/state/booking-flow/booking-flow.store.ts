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
import { computed, effect, inject } from '@angular/core';
import { BarbershopStore } from '../barbershop/barbershop.store';
import { BarberStore } from '../barber/barber.store';
import { ServiceStore } from '../service/service.store';
import {
  barberUpdater,
  barbershopUpdater,
  serviceUpdater,
} from './booking-flow.updaters';
import {
  filterBarbers,
  filterBarbershops,
  filterServices,
} from './booking-flow.filters';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { withEffects } from '@ngrx/signals/events';

export const BookingFlowStore = signalStore(
  { providedIn: 'root' },
  withState<BookingFlowState>(initialBookingFlowState),

  withComputed((store) => {
    const barbers = inject(BarberStore).barbers;
    const barbershops = inject(BarbershopStore).barbershops;
    const services = inject(ServiceStore).services;

    return {
      availableBarbershops: computed(() => {
        const selectedServiceId = store.selectedServiceId();
        // console.log(
        //   'computing barbershops',
        //   filterBarbershops(barbershops(), barbers(), selectedServiceId)
        // );

        return filterBarbershops(barbershops(), barbers(), selectedServiceId);
      }),

      availableBarbers: computed(() => {
        const selectedServiceId = store.selectedServiceId();
        const selectedBarbershopId = store.selectedBarbershopId();
        console.log(1,
          'computing barbers',
          selectedServiceId, selectedBarbershopId
        );

        return filterBarbers(
          barbers(),
          selectedServiceId,
          selectedBarbershopId
        );
      }),

      availableServices: computed(() => {
        const selectedBarberId = store.selectedBarberId();
        // console.log(
        //   'computing services',
        //   filterServices(services(), barbers(), selectedBarberId)
        // );

        return filterServices(services(), barbers(), selectedBarberId);
      })
    };
  }),

  withMethods((store) => {
    const router = inject(Router);
    const barbers = inject(BarberStore).barbers;

    return {
      toggleSelectBarbershop: (barbershopId: number) => {
        const currentState = getState(store);
        const nextParams = barbershopUpdater(currentState, barbershopId);

        router.navigate([], {
          queryParams: nextParams,
          queryParamsHandling: 'merge',
        }).then();
      },


      toggleSelectBarber: (barberId: number) => {
        const currentState = getState(store);
        const nextParams = barberUpdater(currentState, barbers(), barberId);

        router.navigate([], {
          queryParams: nextParams,
          queryParamsHandling: 'merge',
        }).then();
      },

      toggleSelectService: (serviceId: number) => {
        const currentState = getState(store);
        const nextParams = serviceUpdater(currentState, serviceId);

        router.navigate([], {
          queryParams: nextParams,
          queryParamsHandling: 'merge',
        }).then();
      },
    };
  }),

  withEffects((store) => {
    const route = inject(ActivatedRoute);

    const urlParams = toSignal(
      route.queryParams.pipe(
        map((params) => ({
          barberId: params['selectedBarberId'] ? +params['selectedBarberId'] : null,
          serviceId: params['selectedServiceId'] ? +params['selectedServiceId'] : null,
          barbershopId: params['selectedBarbershopId'] ? +params['selectedBarbershopId'] : null,
        })),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
      )
    );

    effect(() => {
      const params = urlParams();
      if(!params) return;

      patchState(store, {
        selectedBarberId: params.barberId ?? null,
        selectedServiceId: params.serviceId ?? null,
        selectedBarbershopId: params.barbershopId ?? null,
      });
    });

    return {};
  })
);
