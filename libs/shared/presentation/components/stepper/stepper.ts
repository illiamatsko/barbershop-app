import { ChangeDetectionStrategy, Component, input } from '@angular/core';


@Component({
  selector: 'lib-stepper',
  imports: [],
  templateUrl: './stepper.html',
  styleUrl: './stepper.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Stepper {
  steps = input.required<string[]>();
  currentStep = input.required<number>();
}
