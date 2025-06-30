import { isValidPhoneNumber } from 'libphonenumber-js';
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function phoneNumberValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;
  console.log(value)

  const isValid = isValidPhoneNumber(value, 'UA');

  return isValid ? null : { invalidPhone: true };
}
