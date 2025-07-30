import { inject, Signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { UrlQuery } from '@barbershop-app/client/appointment/domain';

export class AngularUrlQueryManager {
  private router = inject(Router);
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

  updateParams(params: Partial<UrlQuery>): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }
}
