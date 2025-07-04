import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'lib-phone-input',
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './phone-input.html',
  styleUrl: './phone-input.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneInput {
  control = input.required<FormControl>();
}
