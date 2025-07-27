export interface BarberSummaryDto {
  id: number
  firstName: string
  lastName: string
  photoUrl: string
  experience: number
  starRating: number
  reviewsCount: number
  status: string
  barbershopId: number
  serviceIds: number[]
  location: string
}
