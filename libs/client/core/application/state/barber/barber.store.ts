import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { initialBarberState, BarberState } from './barber.state';
import { setBarbers, setBarberServicesIds } from './barber.updaters';
import { BarberSummaryDto, environment } from '@barbershop-app/shared/domain';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export const BarberStore = signalStore(
  { providedIn: 'root' },
  withState<BarberState>(initialBarberState),
  withMethods((store) => {
    const httpClient = inject(HttpClient);
    const API_URL = environment.apiUrl;

    return {
      setBarbers: (barbers: BarberSummaryDto[]) =>
        patchState(store, (state) => setBarbers(state, barbers)),

      setBarberServicesIds: async (barberId: number) => {
        const serviceIds = await firstValueFrom(httpClient.get<number[]>(`${API_URL}/service/barber/${barberId}`));
        patchState(store, (state) => setBarberServicesIds(state, { [barberId]: serviceIds }));
      }
    };
  })
);
