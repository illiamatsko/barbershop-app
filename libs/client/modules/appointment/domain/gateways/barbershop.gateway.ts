import { BarbershopDto } from '@barbershop-app/shared/types';
import { Observable } from 'rxjs';

export abstract class BarbershopGateway {
  abstract getAll(): Observable<BarbershopDto[]>

}
