import { BookingFlowState, initialBookingFlowState } from './booking-flow.state';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { BarbershopStore } from '../barbershop/barbershop.store';
import { BarberStore } from '../barber/barber.store';
import { ServiceStore } from '../service/service.store';
import {
  filterBarbers,
  barberUpdater,
  barbershopUpdater,
  serviceUpdater, filterBarbershops, filterServices
} from './booking-flow.updaters';


export const BookingFlowStore = signalStore(
  { providedIn: 'root' },
  withState<BookingFlowState>(initialBookingFlowState),

  withComputed(store => {
    const barbers = inject(BarberStore).barbers;
    const barbershops = inject(BarbershopStore).barbershops;
    const services = inject(ServiceStore).services;

    return {
      availableBarbershops: computed(() => {
        const selectedServiceId = store.selectedServiceId();
        console.log('computing barbershops');

        return filterBarbershops(barbershops(), barbers(), selectedServiceId);
      }),

      availableBarbers: computed(() => {
        const selectedServiceId = store.selectedServiceId();
        const selectedBarbershopId = store.selectedBarbershopId();
        console.log('computing barbers');

        return filterBarbers(barbers(), selectedServiceId, selectedBarbershopId);
      }),

      availableServices: computed(() => {
        const selectedBarberId = store.selectedBarberId();
        console.log('computing services');

        return filterServices(services(), barbers(), selectedBarberId);
      }),
    }
  }),

  withMethods(store => {
    const barbers = inject(BarberStore).barbers;

    return {
      toggleSelectBarbershop: (barbershopId: number) => {
        patchState(store, (state) => barbershopUpdater(state, barbershopId))
      },

      toggleSelectBarber: (barberId: number) => {
        patchState(store, (state) => barberUpdater(state, barbers(), barberId));
      },

      toggleSelectService: (serviceId: number) => {
        patchState(store, (state) => serviceUpdater(state, serviceId));
      }
    }
  })
);
