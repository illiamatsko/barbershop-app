import { BookingFlowState, initialBookingFlowState } from './booking-flow.state';
import { getState, patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { computed, effect, inject } from '@angular/core';
import { filterData } from './booking-flow.filters';
import { ActivatedRoute, Router } from '@angular/router';
import { withEffects } from '@ngrx/signals/events';
import { BarbershopStore, BarberStore, ServiceStore, TimeSlotStore } from '@barbershop-app/client/core/application';
import { UrlQueryValidator } from '../validators/url-query.validator';
import { GetTimeSlotsByDate } from '@barbershop-app/client/barber/application';
import { GetPricesByBarberStatusUseCase } from '@barbershop-app/client/service/application';


export const BookingFlowStore = signalStore(
  { providedIn: 'root' },
  withState<BookingFlowState>(initialBookingFlowState),

  withComputed((store) => {
    const barbershopStore = inject(BarbershopStore);
    const barberStore = inject(BarberStore);
    const serviceStore = inject(ServiceStore);
    const timeSlotStore = inject(TimeSlotStore);

    const filteredData = computed(() => {
      const barbershopId = store.barbershopId();
      const barberId = store.barberId();
      const serviceId = store.serviceId();
      const time = store.time();
      const date = store.date();

      const timeSlotsByDate = timeSlotStore.timeSlots().get(date);
      if (!timeSlotsByDate) {
        return {
          filteredBarbershops: barbershopStore.barbershops(),
          filteredBarbers: barberStore.barbers(),
          filteredServices: serviceStore.services(),
          filteredTimeSlots: []
        };
      }

      return filterData(
        barbershopStore.barbershops(),
        barberStore.barbers(),
        serviceStore.services(),
        timeSlotsByDate,
        barbershopId,
        barberId,
        serviceId,
        new Date(date + 'T' + time)
      );
    });

    return {
      selectedDateTime: computed(() => store.date() + 'T' + store.time()),

      availableBarbershops: computed(() => filteredData().filteredBarbershops),
      availableBarbers: computed(() => filteredData().filteredBarbers),
      availableServices: computed(() => filteredData().filteredServices),
      availableTimes: computed(() => [... new Set(filteredData().filteredTimeSlots.map(ts => ts.startTime.toISOString()))]),

      selectedBarbershop: computed(() => barbershopStore.barbershops().find(b => b.id === store.barbershopId())),
      selectedBarber: computed(() => barberStore.barbers().find(b => b.id === store.barberId())),
      selectedService: computed(() => serviceStore.services().find(s => s.id === store.serviceId())),
      selectedTimeSlot: computed(() => {
        const time = store.time();
        const date = store.date();
        const barberId = store.barberId();

        return timeSlotStore.timeSlots().get(date)?.find(ts => ts.startTime.toISOString().split('T')[1] === time && ts.barberId === barberId);
      }),
      isCompleted: computed(() => store.barbershopId() && store.barberId() && store.serviceId() && store.time()),
      price: computed(() => {
        const barber = barberStore.barbers().find(b => b.id === store.barberId());
        const service = serviceStore.services().find(s => s.id === store.serviceId());

        if (!barber || !service) return null;
        return serviceStore.pricesByBarberStatus().get(barber.status)?.find(p => p.serviceId === service.id)?.price ?? null;
      })
    };
  }),

  withMethods((store) => {
    const route = inject(ActivatedRoute);
    const router = inject(Router);
    const timeSlotStore = inject(TimeSlotStore);
    const getTimeSlotsByDate = inject(GetTimeSlotsByDate);

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

      selectDate: async (date: string, resetTime: boolean) => {
        if (!timeSlotStore.timeSlots().has(date)) {
          await getTimeSlotsByDate.execute(date);
        }

        const newParams: { date: string, time?: string | null } = { date };
        if (resetTime) {
          newParams.time = null;
        }

        router.navigate([], {
          relativeTo: route,
          queryParams: newParams,
          queryParamsHandling: 'merge'
        }).then();
      },

      toggleSelectTime: (time: string) => {
        const currentState = getState(store);
        const toggleOn = currentState.time !== time;

        router.navigate([], {
          queryParams: { time: toggleOn ? time : null },
          queryParamsHandling: 'merge'
        }).then();
      },

      syncUrlFromStore: () => {
        const currentState = getState(store);

        router.navigate([], {
          queryParams: currentState,
          queryParamsHandling: 'merge'
        }).then();
      }
    };
  }),

  withEffects((store) => {
    const barberStore = inject(BarberStore);
    const serviceStore = inject(ServiceStore);
    const getPricesByBarberStatusUseCase = inject(GetPricesByBarberStatusUseCase);
    const router = inject(Router);
    const urlQueryValidator = inject(UrlQueryValidator);

    effect(async () => {
      const params = urlQueryValidator.params();

      if (!params || !router.url.startsWith('/appointment/create')) {
        return;
      }

      await store.selectDate(params.date, false);

      const validatedState = urlQueryValidator.validateUrlQueryParams(params);
      patchState(store, validatedState);
      router.navigate([], {
        queryParams: validatedState
      }).then();
    });

    effect(() => {
      const barber = barberStore.barbers().find(b => b.id === store.barberId());
      if (!barber) return;

      if (!serviceStore.pricesByBarberStatus().has(barber.status)) {
        getPricesByBarberStatusUseCase.execute(barber.status).then();
      }
    });

    return {};
  })
);
