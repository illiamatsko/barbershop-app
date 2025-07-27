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
        const barbers = barberStore.barbers();
        const selectedServiceId = store.selectedServiceId();
        console.log('computing barbershops');

        if (!selectedServiceId) return barbershops;

        const filteredBarbers = barbers.filter(barber => barber.serviceIds.includes(selectedServiceId));

        const availableBarbershopIds = [ ...new Set(filteredBarbers.map(b => b.barbershopId))];

        return barbershops.filter(shop => availableBarbershopIds.includes(shop.id));
      }),

      availableBarbers: computed(() => {
        const barbers = barberStore.barbers();
        const selectedServiceId = store.selectedServiceId();
        const selectedBarbershopId = store.selectedBarbershopId();
        console.log('computing barbers');

        let filtered = barbers;
        if(selectedServiceId)
          filtered = barbers.filter(barber => barber.serviceIds.includes(selectedServiceId));

        if(!selectedBarbershopId) return filtered;
        return filtered.filter(barber => barber.barbershopId === selectedBarbershopId);
      }),

      availableServices: computed(() => {
        const services = serviceStore.services();
        const barbers = barberStore.barbers();
        const selectedBarberId = store.selectedBarberId();
        console.log('computing services');

        // No filtering if no barber selected
        if (!selectedBarberId) {
          return services;
        }

        // Filter by barber's available services
        const barber = barbers.find(barber => barber.id === selectedBarberId);
        if(!barber) return services;

        const serviceIds = barber.serviceIds;
        return services.filter(service =>
          serviceIds.includes(service.id)
        );
      }),
    }
    }
  ),
  withMethods(store => {
    const barberStore = inject(BarberStore);

    return {
      toggleSelectBarbershop: (barbershopId: number) => {
        const clickedOnSelected = store.selectedBarbershopId() === barbershopId;

        if(clickedOnSelected) {
          patchState(store, {
            selectedBarbershopId: null,
            selectedBarberId: null,
          });
        } else {
          console.log('setting barbershop', barbershopId)
          patchState(store, {
            selectedBarbershopId: barbershopId,
            selectedBarberId: null,
          });
        }
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
