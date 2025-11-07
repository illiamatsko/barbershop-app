import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'app-appointments',
  imports: [],
  templateUrl: './appointments.html',
  styleUrl: './appointments.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Appointments {}
