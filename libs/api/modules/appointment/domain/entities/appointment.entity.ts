export interface AppointmentEntity {
  id: number
  date: Date
  customerId: number | null
  customerEmail: string
  barbershopId: number
  barberId: number
  serviceId: number
  status: string
  comment: string
}
