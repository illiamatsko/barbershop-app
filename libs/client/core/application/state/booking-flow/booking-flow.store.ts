import { BookingFlowState, initialBookingFlowState } from './booking-flow.state';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { BarbershopStore } from '../barbershop/barbershop.store';
import { BarberStore } from '../barber/barber.store';
import { ServiceStore } from '../service/service.store';


export const BookingFlowStore = signalStore(
  { providedIn: 'root' },
  withState<BookingFlowState>(initialBookingFlowState),

  withComputed(store => {
    const barberStore = inject(BarberStore);
    const barbershopStore = inject(BarbershopStore);
    const serviceStore = inject(ServiceStore);

    return {
      availableBarbershops: computed(() => {
        const barbershops = barbershopStore.barbershops();

        if(store.selectedBarberId()) {
          const barber = barberStore.barbers().find(barber => barber.id === store.selectedBarberId());
          if(barber) {
            const shop = barbershops.find((shop) => shop.id === barber.barbershopId);
            if(shop) {
              return [shop];
            }
          }
        }

        // No filtering needed if no service selected
        if (!store.selectedServiceId()) {
          return barbershops;
        }

        // Filter barbershops that have barbers offering the selected service
        const serviceId = store.selectedServiceId();
        if(!serviceId) return barbershops;

        const servicesByBarberId = barberStore.servicesByBarberId();
        const barbers = barberStore.barbers().filter(barber =>
          servicesByBarberId[barber.id].includes(serviceId)
        );

        const availableBarbershopIds = barbers.map(b => b.barbershopId);

        return barbershops.filter(shop => availableBarbershopIds.includes(shop.id));
      }),

      availableBarbers: computed(() => {
        let barbers = barberStore.barbers();

        // Filter by barbershop if selected
        if (store.selectedBarbershopId()) {
          barbers = barbers.filter(
            barber => barber.barbershopId === store.selectedBarbershopId()
          );
        }

        // Filter by service if selected
        const serviceId = store.selectedServiceId();
        if(!serviceId) return barbers;

        const servicesByBarberId = barberStore.servicesByBarberId();
        if (store.selectedServiceId()) {
          barbers = barberStore.barbers().filter(barber =>
            servicesByBarberId[barber.id].includes(serviceId)
          );
        }

        return barbers;
      }),

      availableServices: computed(() => {
        const services = serviceStore.services();

        // No filtering if no barber selected
        if (!store.selectedBarberId()) {
          return services;
        }

        // Filter by barber's available services
        const barberStore = inject(BarberStore);
        const barberId = store.selectedBarberId();
        if(!barberId) return services;

        return services.filter(service =>
          barberStore.servicesByBarberId()[barberId].includes(service.id)
        );
      }),
    }
    }
  ),
  withMethods(store => {
    const barberStore = inject(BarberStore);

    return {
      toggleSelectBarbershop: (barbershopId: number) => {
        if(store.selectedBarbershopId() && barbershopId === store.selectedBarbershopId()) {
          return patchState(store, { selectedBarbershopId: null })
        }

        patchState(store, { selectedBarbershopId: barbershopId })
      },

      toggleSelectBarber: (barberId: number) => {
        if(store.selectedBarberId() && barberId === store.selectedBarberId()) {
          return patchState(store, { selectedBarberId: null })
        }

        const barber = barberStore.barbers().find(b => b.id === barberId);
        if (!barber) return;

        patchState(store, {
          selectedBarberId: barberId,
          selectedBarbershopId: barber.barbershopId,
        });
      },

      toggleSelectService: (serviceId: number) => {
        if(store.selectedServiceId() && serviceId === store.selectedServiceId()) {
          return patchState(store, { selectedServiceId: null });
        }

        patchState(store, { selectedServiceId: serviceId });
      }
    }
  })
);
