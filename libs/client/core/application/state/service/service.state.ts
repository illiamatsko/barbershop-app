import { ServiceDto } from '@barbershop-app/shared/domain';

export interface ServiceState {
  services: ServiceDto[]
  pricesByBarberStatusId: Map<number, {serviceId: number, price: number}[]>
}

export const initialServiceState: ServiceState = {
  services: [],
  pricesByBarberStatusId: new Map<number, {serviceId: number, price: number}[]>()
}
