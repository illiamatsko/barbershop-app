import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAppointmentCommand } from '../commands/create-appointment.command';
import {
  AppointmentMapper,
  AppointmentRepository,
} from '@barbershop-app/api/appointment/domain';
import { AppointmentDto } from '@barbershop-app/shared/domain';


@CommandHandler(CreateAppointmentCommand)
export class CreateAppointmentUseCase implements ICommandHandler<CreateAppointmentCommand> {
  constructor(private readonly appointmentRepo: AppointmentRepository) {}

  async execute(command: CreateAppointmentCommand): Promise<AppointmentDto> {
    const appointmentEntity = await this.appointmentRepo.create(command.payload);

    return AppointmentMapper.toDto(appointmentEntity);
  }
}
