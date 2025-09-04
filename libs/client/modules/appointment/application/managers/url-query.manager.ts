import { computed, inject, Injectable } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { BookingFlowState } from '../booking-flow/booking-flow.state';
import { BarbershopStore, BarberStore, ServiceStore } from '@barbershop-app/client/core/application';


@Injectable({ providedIn: 'root' })
export class UrlQueryManager {
  private barbershopSignal = inject(BarbershopStore).barbershops;
  private barberSignal = inject(BarberStore).barbers;
  private serviceSignal = inject(ServiceStore).services;
  private route = inject(ActivatedRoute);

  public isReady = computed(() => this.barbershopSignal().length > 0 && this.barberSignal().length > 0 && this.serviceSignal().length > 0);

  private toNullableNumber(value: unknown) {
    if(!value) return null;
    const n = Number(value);
    return Number.isNaN(n) ? null : n;
  }

  readonly params = toSignal(
    this.route.queryParams.pipe(
      map((params) => ({
        barbershopId: this.toNullableNumber(params['barbershopId']),
        barberId: this.toNullableNumber(params['barberId']),
        serviceId: this.toNullableNumber(params['serviceId']),
      }))
    )
  );

  setParams(urlQuery: BookingFlowState, currentState: BookingFlowState): BookingFlowState {
    console.log('ids', urlQuery.barbershopId, currentState.barbershopId)
    const barbershopChange = urlQuery.barbershopId !== currentState.barbershopId;
    const barberChange = urlQuery.barberId !== currentState.barberId;
    const serviceChange = urlQuery.serviceId !== currentState.serviceId;

    const barbershops = this.barbershopSignal();
    const barbers = this.barberSignal();
    const services = this.serviceSignal();

    console.log('url:', urlQuery)

    const newState: BookingFlowState = {
      barbershopId: null,
      barberId: null,
      serviceId: null
    };

    let isBarbershopValid = false;
    if(urlQuery.barbershopId) {
      isBarbershopValid = barbershops.map(shop => shop.id).includes(urlQuery.barbershopId);
    }

    if (barbershopChange && isBarbershopValid) {
      console.log('barbershop changed')
      newState.barbershopId = urlQuery.barbershopId;
    } else {
      newState.barbershopId = currentState.barbershopId;
    }

    const barber = urlQuery.barberId
      ? barbers.find(b => b.id === urlQuery.barberId)
      : null;

    if (barberChange) {
      console.log('barber changed')
      if(!barber) {
        console.log('barber1')
        return newState;
      }

      newState.barberId = barber.id;
      newState.barbershopId = barber.barbershopId;
    } else {
      newState.barberId = currentState.barberId;
    }

    if (serviceChange) {
      console.log('service changed')

      if(!urlQuery.serviceId) return newState;

      if(barber) {
        const hasService = barber.serviceIds.includes(urlQuery.serviceId);
        newState.serviceId = hasService ? urlQuery.serviceId : null;
      } else {
        const isExisting = services.find(service => service.id === urlQuery.serviceId);

        const availableServiceIds = [... new Set(barbers.filter(b => b.barbershopId === urlQuery.barbershopId).flatMap(bb => bb.serviceIds))];
        const isAvailable = availableServiceIds.includes(urlQuery.serviceId);
        newState.serviceId = isExisting && isAvailable ? urlQuery.serviceId : null;
      }

      return newState;
    }

    return newState;
  }
}
