import { BookingFlowState, initialBookingFlowState } from './booking-flow.state';
import { getState, patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { computed, effect, inject, untracked } from '@angular/core';
import { filterData } from './booking-flow.filters';
import { ActivatedRoute, Router } from '@angular/router';
import { withEffects } from '@ngrx/signals/events';
import { BarbershopStore, BarberStore, ServiceStore, TimeSlotStore } from '@barbershop-app/client/core/application';
import { UrlQueryValidator } from '../validators/url-query.validator';
import { GetTimeSlotsByDate } from '@barbershop-app/client/barber/application';


export const BookingFlowStore = signalStore(
  { providedIn: 'root' },
  withState<BookingFlowState>(initialBookingFlowState),

  withComputed((store) => {
    const barbers = inject(BarberStore).barbers;
    const barbershops = inject(BarbershopStore).barbershops;
    const services = inject(ServiceStore).services;
    const timeSlots = inject(TimeSlotStore).timeSlots;

    const filteredData = computed(() => {
      const barbershopId = store.barbershopId();
      const barberId = store.barberId();
      const serviceId = store.serviceId();
      const time = store.time();
      const date = store.date();
      console.log('filtering...', date)

      const timeSlotsByDate = timeSlots().get(date);

      if (!timeSlotsByDate) {
        return {
          filteredBarbershops: barbershops(),
          filteredBarbers: barbers(),
          filteredServices: services(),
          filteredTimeSlots: []
        };
      }

      return filterData(
        barbershops(),
        barbers(),
        services(),
        timeSlotsByDate,
        barbershopId,
        barberId,
        serviceId,
        time
      );
    });

    return {
      availableBarbershops: computed(() => filteredData().filteredBarbershops),
      availableBarbers: computed(() => filteredData().filteredBarbers),
      availableServices: computed(() => filteredData().filteredServices),
      availableTimes: computed(() => [... new Set(filteredData().filteredTimeSlots.map(ts => ts.startTime.toISOString()))]),

      selectedBarbershop: computed(() => barbershops().find(b => b.id === store.barbershopId())),
      selectedBarber: computed(() => barbers().find(b => b.id === store.barberId())),
      selectedService: computed(() => services().find(s => s.id === store.serviceId())),
      selectedTimeSlot: computed(() => {
        const time = store.time();
        const date = time ? time.split('T')[0] : '';
        const barberId = store.barberId();

        return timeSlots().get(date)?.find(ts => ts.startTime.toISOString() === time && ts.barberId === barberId);
      }),
      isCompleted: computed(() => store.barbershopId() && store.barberId() && store.serviceId() && store.time())
    };
  }),

  withMethods((store) => {
    const route = inject(ActivatedRoute);
    const router = inject(Router);
    const timeSlotStore = inject(TimeSlotStore);
    const getTimeSlotsByDate = inject(GetTimeSlotsByDate);

    return {
      loadDate: (date: string) => {
        const hasTimeSlots = timeSlotStore.timeSlots().has(date);

        if (!hasTimeSlots) {
          getTimeSlotsByDate.execute(date).then();
        }

        patchState(store, { date, time: null });
      },

      toggleSelectBarbershop: (barbershopId: number) => {
        const currentState = getState(store);
        let newBarbershopId: number | null = barbershopId;

        if(currentState.barbershopId && currentState.barbershopId === barbershopId) {
          newBarbershopId = null;
        }

        router.navigate([], {
          relativeTo: route,
          queryParams: { barbershopId: newBarbershopId },
          queryParamsHandling: 'merge'
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
          queryParamsHandling: 'merge'
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
          queryParamsHandling: 'merge'
        }).then();
      },

      toggleSelectTime: (time: string) => {
        const currentState = getState(store);
        let newTime = time;


        if(currentState.time === time) {
          newTime = '';
        }

        router.navigate([], {
          queryParams: { time: newTime },
          queryParamsHandling: 'merge'
        }).then();
      }
    };
  }),

  withEffects((store) => {
    const router = inject(Router);
    const urlQueryValidator = inject(UrlQueryValidator);

    effect(() => {
      //TODO: fix reloading filters after changing date
      const params = urlQueryValidator.params();
      const currentState = untracked(() => getState(store));
      if (!params || !urlQueryValidator.isReady()) return;

      const fullParams = { ...params, date: params.time ? params.time.split('T')[0] : currentState.date };

      const next = urlQueryValidator.setParams(fullParams);
      console.log('current', currentState)
      console.log('next:', next)
      console.log('')

      patchState(store, next);
      const { date: _, ...rest } = next;
      router.navigate([], {
        queryParams: rest
      }).then();
    });

    return {};
  })
);
