import { Injectable } from '@nestjs/common';
import { PrismaService } from '@barbershop-app/prisma';
import { Barber, TimeSlot } from '@prisma/client';
import { ServiceRepository } from '@barbershop-app/service';

@Injectable()
export class BarberRepository {
  constructor(
    private prisma: PrismaService,
    private serviceRepo: ServiceRepository
  ) {}

  async getAll(): Promise<Barber[]> {
    return this.prisma.barber.findMany();
  }

  async getTimeSlots(id: number): Promise<TimeSlot[]> {
    return this.prisma.timeSlot.findMany({
      where: { barberId: id },
    });
  }

  async getServices(id: number) {
    const barberServices = await this.prisma.barberService.findMany({
      select: {
        serviceId: true
      },
      where: {
        barberId: id
      }
    });

    const services = [];
    for(const obj of barberServices) {
      services.push(await this.serviceRepo.getById(obj.serviceId));
    }

    return services;
  }
}
