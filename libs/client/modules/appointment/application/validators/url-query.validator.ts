import { computed, inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { BookingFlowState } from '../booking-flow/booking-flow.state';
import { BarbershopStore, BarberStore, ServiceStore, TimeSlotStore } from '@barbershop-app/client/core/application';
import { getBarbersFromBarbershop, hasEnoughConsecutiveSlots } from '../booking-flow/booking-flow.helpers';


@Injectable({ providedIn: 'root' })
export class UrlQueryValidator {
  private barbershopSignal = inject(BarbershopStore).barbershops;
  private barberSignal = inject(BarberStore).barbers;
  private serviceSignal = inject(ServiceStore).services;
  private timeSlotSignal = inject(TimeSlotStore).timeSlots;
  private route = inject(ActivatedRoute);

  public isReady = computed(() => this.barbershopSignal().length > 0 && this.barberSignal().length > 0 && this.serviceSignal().length > 0);

  private toNullableNumber(value: unknown) {
    if(!value) return null;
    const n = Number(value);
    return Number.isNaN(n) ? null : n;
  }

  readonly params = toSignal(
    this.route.queryParams.pipe(
      map((params) => ({
        barbershopId: this.toNullableNumber(params['barbershopId']),
        barberId: this.toNullableNumber(params['barberId']),
        serviceId: this.toNullableNumber(params['serviceId']),
        time: params['time']
      }))
    )
  );

  setParams(urlQueryParams: BookingFlowState): BookingFlowState {
    const allBarbershops = this.barbershopSignal();
    const allBarbers = this.barberSignal();
    const allServices = this.serviceSignal();
    const allTimeSlots = this.timeSlotSignal();

    const newState: BookingFlowState = {
      barbershopId: null,
      barberId: null,
      serviceId: null,
      date: urlQueryParams.date,
      time: null
    };

    const requestedBarber = allBarbers.find(b => b.id === urlQueryParams.barberId);
    if (requestedBarber) {
      newState.barberId = requestedBarber.id;
      newState.barbershopId = requestedBarber.barbershopId;
    }

    const requestedBarbershop = allBarbershops.find(s => s.id === urlQueryParams.barbershopId);
    if (!newState.barbershopId && requestedBarbershop) {
      newState.barbershopId = requestedBarbershop.id;
    }

    const requestedService = allServices.find(s => s.id === urlQueryParams.serviceId);
    if (requestedService) {
      let isServiceValid: boolean;

      if (requestedBarber) {
        isServiceValid = requestedBarber.serviceIds.includes(requestedService.id);
      } else if (newState.barbershopId) {
        const barbershopBarbers = getBarbersFromBarbershop(newState.barbershopId, allBarbers);
        const availableServiceIds = new Set(barbershopBarbers.flatMap(b => b.serviceIds));
        isServiceValid = availableServiceIds.has(requestedService.id);
      } else {
        isServiceValid = true;
      }

      newState.serviceId = isServiceValid ? requestedService.id : null;
    }

    const urlTime = urlQueryParams.time;
    if (urlTime) {
      const requestedTime = new Date(urlTime);
      const timesForDate = allTimeSlots.get(newState.date);
      if (timesForDate) {
        let isTimeValid = true;
        let barberIdsToCheck: number[] = [];

        if (requestedBarber) {
          isTimeValid = timesForDate.some(
            (ts) =>
              ts.barberId === requestedBarber.id &&
              ts.startTime.getTime() === requestedTime.getTime() &&
              ts.status === 'AVAILABLE'
          );
          barberIdsToCheck = [requestedBarber.id];
        } else if (newState.barbershopId) {
          const barbershopBarberIds = allBarbers.filter(b => b.barbershopId === newState.barbershopId).map(b => b.id);
          isTimeValid = timesForDate.some(
            (ts) =>
              barbershopBarberIds.includes(ts.barberId) &&
              ts.startTime.getTime() === requestedTime.getTime() &&
              ts.status === 'AVAILABLE'
          );
          barberIdsToCheck = barbershopBarberIds;
        }

        if (barberIdsToCheck.length === 0) {
          barberIdsToCheck = allBarbers.map(b => b.id);
        }
        if (isTimeValid) {
          const service = allServices.find(s => s.id === newState.serviceId);
          if (service) {
            isTimeValid = hasEnoughConsecutiveSlots(
              requestedTime,
              timesForDate,
              service.duration,
              barberIdsToCheck
            );
          }
        }

        newState.time = isTimeValid ? requestedTime.toISOString() : null;
      }
    }

    return newState;
  }
}
