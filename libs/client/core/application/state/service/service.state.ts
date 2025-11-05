import { ServiceDto } from '@barbershop-app/shared/domain';

export interface ServiceState {
  services: ServiceDto[]
  pricesByBarberStatus: Map<string, {serviceId: number, price: number}[]>
}

export const initialServiceState: ServiceState = {
  services: [],
  pricesByBarberStatus: new Map<string, {serviceId: number, price: number}[]>()
}
