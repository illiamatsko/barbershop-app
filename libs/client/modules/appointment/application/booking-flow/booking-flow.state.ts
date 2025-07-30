export interface BookingFlowState {
  selectedBarbershopId: number | null
  selectedBarberId: number | null
  selectedServiceId: number | null
}

export const initialBookingFlowState: BookingFlowState = {
  selectedBarbershopId: null,
  selectedBarberId: null,
  selectedServiceId: null
};
