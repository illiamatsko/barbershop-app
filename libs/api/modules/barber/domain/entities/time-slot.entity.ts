export interface TimeSlotEntity {
  id: number,
  startTime: Date,
  status: string,
  barberId: number,
  appointmentId: number | null
}
