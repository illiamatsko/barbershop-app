import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-form-text-area',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-text-area.html',
  styleUrl: './form-text-area.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormTextArea {
  id = input.required<string>();
  label = input.required<string>();
  placeholder = input<string>('');
  control = input.required<FormControl>();
}
