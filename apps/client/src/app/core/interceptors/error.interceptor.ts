import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { catchError } from 'rxjs';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError(error => {
      if(error) {
        switch (error.status) {

          case 400:
            toastr.error(error.error?.message || 'Bad request');
            break;

          case 404:
            router.navigateByUrl('/not-found').then();
            break;

          case 500:
            router.navigateByUrl('/server-error', { state: { error: error.error } }).then()
            break;

          default:
            toastr.error('Something unexpected went wrong')
            break;
        }

      }

      throw error;
    })
  );
};
