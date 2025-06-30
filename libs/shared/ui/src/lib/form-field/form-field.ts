import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-form-field',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-field.html',
  styleUrl: './form-field.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormField {
  id = input.required<string>();
  type = input.required<string>();
  label = input.required<string>();
  placeholder = input<string>('');
  control = input.required<FormControl>();
}
