import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CancelAppointmentCommand } from '../commands/cancel-appointment.command';
import { AppointmentRepository } from '@barbershop-app/api/appointment/domain';


@CommandHandler(CancelAppointmentCommand)
export class CancelAppointmentUseCase implements ICommandHandler<CancelAppointmentCommand> {
  constructor(private appointmentRepo: AppointmentRepository) {}

  execute(command: CancelAppointmentCommand) {
    return this.appointmentRepo.cancelAppointment(command.appointmentId);
  }
}
