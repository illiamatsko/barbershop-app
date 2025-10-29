import { computed, inject, Injectable } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { BookingFlowState } from '../booking-flow/booking-flow.state';
import { BarbershopStore, BarberStore, ServiceStore, TimeSlotStore } from '@barbershop-app/client/core/application';
import {
  TimeSlotDto,
} from '@barbershop-app/shared/domain';


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
        timeSlotId: this.toNullableNumber(params['timeSlotId'])
      }))
    )
  );

  setParams(urlQueryParams: BookingFlowState): BookingFlowState {
    const allBarbershops = this.barbershopSignal();
    const allBarbers = this.barberSignal();
    const allServices = this.serviceSignal();
    const allTimeSlots = this.timeSlotSignal();
    const allTimeSlotsArray = Array.from(allTimeSlots.values()).flat();

    console.log('url:', urlQueryParams)

    const newState: BookingFlowState = {
      barbershopId: null,
      barberId: null,
      serviceId: null,
      timeSlotId: null
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
      let isServiceValid = false;

      if (requestedBarber) {
        isServiceValid = requestedBarber.serviceIds.includes(requestedService.id);
      } else if (newState.barbershopId) {
        const barbershopBarbers = allBarbers.filter(b => b.barbershopId === newState.barbershopId);
        const availableServiceIds = new Set(barbershopBarbers.flatMap(b => b.serviceIds));
        isServiceValid = availableServiceIds.has(requestedService.id);
      } else {
        isServiceValid = true;
      }

      newState.serviceId = isServiceValid ? requestedService.id : null;
    }

    let timeSlotsForDate = null;
    let requestedTimeSlot = null;
    for (const [, slots] of allTimeSlots) {
      const slot = slots.find(s => s.id === urlQueryParams.timeSlotId)
      if (slot) {
        timeSlotsForDate = slots;
        requestedTimeSlot = slot;
      }
    }
    if (requestedTimeSlot && timeSlotsForDate) {
      let isTimeSlotValid = true;

      if (requestedBarber) {
        isTimeSlotValid = requestedTimeSlot.barberId === requestedBarber.id
      } else if (newState.barbershopId) {
        const barbershopBarberIds = allBarbers.filter(b => b.barbershopId === newState.barbershopId).map(b => b.id);
        const availableTimeSlotIds = allTimeSlotsArray.filter(ts => barbershopBarberIds.includes(ts.barberId)).map(ts => ts.id)
        isTimeSlotValid = availableTimeSlotIds.includes(requestedTimeSlot.id)
      }

      if (isTimeSlotValid && newState.serviceId) {
        const service = allServices.find(s => s.id === newState.serviceId);
        isTimeSlotValid = this.hasEnoughConsecutiveSlots(requestedTimeSlot, timeSlotsForDate, service!.duration, requestedBarber ? requestedBarber.id : null)
      }

      newState.timeSlotId = isTimeSlotValid ? requestedTimeSlot.id : null
    }

    return newState;
  }

  hasEnoughConsecutiveSlots(requestedTimeSlot: TimeSlotDto, timeSlotsForDate: TimeSlotDto[], requestedServiceDuration: number, requestedBarberId: number | null) {
    const endTime = new Date(requestedTimeSlot.startTime.getTime() + requestedServiceDuration * 60_000);

    const consecutiveSlots = timeSlotsForDate.filter(slot =>
      slot.barberId === requestedTimeSlot.barberId &&
      slot.startTime >= requestedTimeSlot.startTime &&
      slot.startTime < endTime &&
      slot.status === 'AVAILABLE' &&
      (!requestedBarberId || slot.barberId === requestedBarberId)
    );

    const availableMinutes = consecutiveSlots.length * 30;
    console.log('consecutive slots:', consecutiveSlots)
    return availableMinutes >= requestedServiceDuration;
  }
}
