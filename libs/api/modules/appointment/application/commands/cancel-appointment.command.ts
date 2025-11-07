import { Command } from '@nestjs/cqrs';

export class CancelAppointmentCommand extends Command<boolean> {
  constructor(public appointmentId: number) {
    super();
  }
}
