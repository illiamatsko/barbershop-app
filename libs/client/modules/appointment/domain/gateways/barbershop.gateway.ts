import { BarbershopDto } from '@barbershop-app/shared/domain';
import { Observable } from 'rxjs';

export abstract class BarbershopGateway {
  abstract getAll(): Observable<BarbershopDto[]>

}
