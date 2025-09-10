export interface TimeSlotDto {
  id: number,
  startTime: Date,
  status: string,
  barberId: number,
  appointmentId: number | null
}
