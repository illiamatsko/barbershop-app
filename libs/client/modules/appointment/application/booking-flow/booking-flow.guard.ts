import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { computed, inject, Injectable } from '@angular/core';
import { BookingFlowStore } from './booking-flow.store';
import { getTomorrowDate } from './booking-flow.helpers';
import {
  BarbershopStore,
  BarberStore,
  ServiceStore,
} from '@barbershop-app/client/core/application';

@Injectable({ providedIn: 'root' })
export class BookingStateGuard implements CanActivate {
  private barbershopSignal = inject(BarbershopStore).barbershops;
  private barberSignal = inject(BarberStore).barbers;
  private serviceSignal = inject(ServiceStore).services;
  private bookingFlowStore = inject(BookingFlowStore);
  private router = inject(Router);

  public isReady = computed(() =>
    this.barbershopSignal().length > 0 &&
    this.barberSignal().length > 0 &&
    this.serviceSignal().length > 0
  );

  private waitUntilReady(): Promise<void> {
    return new Promise((resolve) => {
      const check = () => {
        if (this.isReady()) resolve();
        else setTimeout(check, 50);
      };
      check();
    });
  }

  async canActivate(route: ActivatedRouteSnapshot): Promise<UrlTree | boolean> {
    await this.waitUntilReady();

    const queryParams = route.queryParams;

    if (!queryParams['date'] && !this.bookingFlowStore.date()) {
      return this.router.createUrlTree(['/appointment/create'], {
        queryParams: {
          ...queryParams,
          date: getTomorrowDate().toISOString().split('T')[0],
        }
      });
    }

    return true;
  }
}
