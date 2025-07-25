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
        return barbershops

        // Filter barbershops that have barbers offering the selected service
        // const serviceId = store.selectedServiceId();
        // if(!serviceId) return barbershops;
        //
        // const barbers = barberStore.barbers().filter(barber => {
        //   const servicesByBarberId = barberStore.servicesByBarberId()[barber.id];
        //   if(!servicesByBarberId) {
        //     barberStore.setBarberServicesIds(barber.id);
        //     return [];
        //   }
        //
        //   return servicesByBarberId.includes(serviceId);
        // });
        //
        // const availableBarbershopIds = barbers.map(b => b.barbershopId);
        //
        // return barbershops.filter(shop => availableBarbershopIds.includes(shop.id));
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
          barbers = barberStore.barbers().filter(barber => {
            if(!servicesByBarberId[barber.id]) {
              barberStore.setBarberServicesIds(barber.id)
              return false;
            }
            return servicesByBarberId[barber.id].includes(serviceId);
          }
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
        const barberId = store.selectedBarberId();
        if(!barberId) return services;

        const servicesByBarberId = barberStore.servicesByBarberId()[barberId];
        if(!servicesByBarberId) {
          barberStore.setBarberServicesIds(barberId);
          return [];
        }

        return services.filter(service =>
          servicesByBarberId.includes(service.id)
        );
      }),
    }
    }
  ),
  withMethods(store => {
    const barberStore = inject(BarberStore);

    return {
      toggleSelectBarbershop: (barbershopId: number) => {
        const selectedBarbershopId = store.selectedBarbershopId();
        const selectedBarberId = store.selectedBarberId();

        if (selectedBarbershopId === barbershopId && !selectedBarberId) {
          patchState(store, { selectedBarbershopId: null });
          return;
        }

        const newState: Partial<BookingFlowState> = {
          selectedBarbershopId: barbershopId,
        };

        if (selectedBarberId && selectedBarbershopId !== barbershopId) {
          newState.selectedBarberId = null;
        }

        patchState(store, newState);
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
