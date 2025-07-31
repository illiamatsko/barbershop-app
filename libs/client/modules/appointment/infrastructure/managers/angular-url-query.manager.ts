import { inject, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { UrlQuery } from '@barbershop-app/client/appointment/domain';
import { BarberStore } from '@barbershop-app/client/core/application';

export class AngularUrlQueryManager {
  private barberStore = inject(BarberStore);
  private route = inject(ActivatedRoute);

  private toNullableNumber(value: unknown): number | null {
    const n = Number(value);
    return Number.isNaN(n) ? null : n;
  }

  getParams(): Signal<UrlQuery> {
    return toSignal(
      this.route.queryParams.pipe(
        map((params) => ({
          barbershopId: this.toNullableNumber(params['barbershopId']),
          barberId: this.toNullableNumber(params['barberId']),
          serviceId: this.toNullableNumber(params['serviceId'])
        }))
      ),
      {
        initialValue: {
          barbershopId: null,
          barberId: null,
          serviceId: null
        },
      }
    );
  }

  setParams(query: UrlQuery) {
    if(!query.barbershopId || !query.barberId || !query.serviceId) return;

    const newState = query;

    const barber = this.barberStore.barbers()[query.barberId];
    if(barber.barbershopId != query.barbershopId) {
      newState.barbershopId = barber.barbershopId;
    }
  }
}
