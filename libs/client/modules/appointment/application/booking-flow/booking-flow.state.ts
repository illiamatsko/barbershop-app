export interface BookingFlowState {
  barbershopId: number | null
  barberId: number | null
  serviceId: number | null
  date: string             // ISO date string: "2025-10-31"
  time: string | null      // ISO time string: "14:30:00Z"
}

export const initialBookingFlowState: BookingFlowState = {
  barbershopId: null,
  barberId: null,
  serviceId: null,
  date: '',
  time: null
};
