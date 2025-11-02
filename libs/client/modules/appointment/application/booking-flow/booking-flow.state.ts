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
  date: getNextDay(),
  time: null
};

function getNextDay(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
}
