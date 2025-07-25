import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SelectBarbershop } from '../select-barbershop/select-barbershop';
import { SelectBarber } from '../select-barber/select-barber';
import { SelectTime } from '../select-time/select-time';
import { Confirmation } from '../confirmation/confirmation';
import { Header } from './header/header';
import { SelectService } from '../select-service/select-service';


@Component({
  selector: 'app-create-appointment',
  imports: [
    SelectBarbershop,
    SelectBarber,
    SelectTime,
    Confirmation,
    Header,
    SelectService,
  ],
  templateUrl: './create-appointment.html',
  styleUrl: './create-appointment.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAppointment {}
