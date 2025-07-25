export interface BookingFlowState {
  selectedBarbershopId: number | null
  selectedBarberId: number | null
  selectedServiceId: number | null

  currentStep: number
  entryPoint: 'normal' | 'barber-first' | 'service-first'
  preselectedServiceId: number | null
  preselectedBarberId: number | null
}

export const initialBookingFlowState: BookingFlowState = {
  selectedBarbershopId: null,
  selectedBarberId: null,
  selectedServiceId: null,

  currentStep: 1,
  entryPoint: 'normal',
  preselectedServiceId: null,
  preselectedBarberId: null
};
