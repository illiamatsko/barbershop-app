import { Command } from '@nestjs/cqrs';
import {
  AppointmentDto,
  CreateAppointmentPayload,
} from '@barbershop-app/shared/domain';

export class CreateAppointmentCommand extends Command<AppointmentDto> {
  constructor(
    public readonly payload: CreateAppointmentPayload
  ) {
    super();
  }
}
