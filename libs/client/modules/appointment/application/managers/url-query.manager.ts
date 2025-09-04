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

  setParams(urlQueryParams: BookingFlowState): BookingFlowState {
    const barbershops = this.barbershopSignal();
    const barbers = this.barberSignal();
    const services = this.serviceSignal();

    console.log('url:', urlQueryParams)

    const newState: BookingFlowState = {
      barbershopId: null,
      barberId: null,
      serviceId: null
    };

    const barbershop = barbershops.find(shop => shop.id === urlQueryParams.barbershopId);
    if (barbershop) {
      newState.barbershopId = urlQueryParams.barbershopId;
    } else {
      newState.barbershopId = null;
    }

    const barber = barbers.find(b => b.id === urlQueryParams.barberId);
    if (barber) {
      newState.barberId = barber.id;
      newState.barbershopId = barber.barbershopId;
    } else {
      newState.barberId = null;
    }

    const service = services.find(service => service.id === urlQueryParams.serviceId);
    if(service) {
      if(barber) {
        const barberHasService = !!barber.serviceIds.find(() => urlQueryParams.serviceId);
        newState.serviceId = barberHasService ? urlQueryParams.serviceId : null;
      } else if (barbershop) {
        const barbershopAvailableServiceIds = [... new Set(barbers.filter(b => b.barbershopId === urlQueryParams.barbershopId).flatMap(bb => bb.serviceIds))];
        const isServiceAvailable = !!barbershopAvailableServiceIds.find(() => urlQueryParams.serviceId);
        newState.serviceId = isServiceAvailable ? urlQueryParams.serviceId : null;
      } else {
        newState.serviceId = service.id;
      }
    } else {
      newState.serviceId = null;
    }

    return newState;
  }
}
