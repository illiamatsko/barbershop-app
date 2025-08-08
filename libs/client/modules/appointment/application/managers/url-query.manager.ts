import { inject, Injectable } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { BarberStore } from '@barbershop-app/client/core/application';
import { BookingFlowState } from '../booking-flow/booking-flow.state';


@Injectable({ providedIn: 'root' })
export class UrlQueryManager {
  private barberStore = inject(BarberStore);
  private route = inject(ActivatedRoute);

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
    const barbershopChange = urlQuery.barbershopId !== currentState.barbershopId;
    const barberChange = urlQuery.barberId !== currentState.barberId;
    const serviceChange = urlQuery.serviceId !== currentState.serviceId;

    if (barbershopChange) {
      return { barbershopId: urlQuery.barbershopId, barberId: null, serviceId: null };
    }

    const barber = urlQuery.barberId
      ? this.barberStore.barbers().find(b => b.id === urlQuery.barberId)
      : null;

    if (barberChange) {
      console.log('barber change 1')
      if (!barber) {
        return currentState;
      }
      console.log('barber change 2')
      return { barbershopId: barber.barbershopId, barberId: barber.id, serviceId: null };
    }

    if (serviceChange) {
      // якщо serviceId не заданий у URL → просто скинути
      if (!urlQuery.serviceId) {
        return { ...currentState, serviceId: null };
      }
      // якщо barber не вибраний або не знайдений — не чіпаємо
      if (!barber) return currentState;

      // ВИПРАВЛЕНО: якщо перукар має цей сервіс → ставимо, інакше скидаємо
      const hasService = barber.serviceIds.includes(urlQuery.serviceId);
      return { ...currentState, serviceId: hasService ? urlQuery.serviceId : null };
    }

    return currentState;
  }
}
