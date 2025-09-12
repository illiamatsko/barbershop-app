export interface BookingFlowState {
  barbershopId: number | null
  barberId: number | null
  serviceId: number | null
  timeSlotId: number | null
}

export const initialBookingFlowState: BookingFlowState = {
  barbershopId: null,
  barberId: null,
  serviceId: null,
  timeSlotId: null
};
