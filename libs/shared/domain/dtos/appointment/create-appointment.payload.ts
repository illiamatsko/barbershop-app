export interface CreateAppointmentPayload {
  customerId: number | null
  email: string
  barberId: number
  serviceId: number
  date: string
  comment: string
}
