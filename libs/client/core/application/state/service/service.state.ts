import { ServiceDto } from '@barbershop-app/shared/domain';

export interface ServiceState {
  services: ServiceDto[]
}

export const initialServiceState: ServiceState = {
  services: []
}
