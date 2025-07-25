import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { BarbershopState, initialBarbershopState } from './barbershop.state';
import { BarbershopDto, environment } from '@barbershop-app/shared/domain';
import { setBarbershopBarberIds, setBarbershops } from './barbershop.updaters';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export const BarbershopStore = signalStore(
  { providedIn: 'root' },
  withState<BarbershopState>(initialBarbershopState),
  withMethods((store) => {
    const httpClient = inject(HttpClient);
    const API_URL = environment.apiUrl;

    return {
      setBarbershops: (barbershops: BarbershopDto[]) =>
        patchState(store, (state) => setBarbershops(state, barbershops)),

      setBarberServicesIds: async (barbershopId: number) => {
        const barberIds = await firstValueFrom(httpClient.get<number[]>(`${API_URL}/barbershop/${barbershopId}/barbers`));
        patchState(store, (state) => setBarbershopBarberIds(state, { [barbershopId]: barberIds }));
      }
    };
  })
);
