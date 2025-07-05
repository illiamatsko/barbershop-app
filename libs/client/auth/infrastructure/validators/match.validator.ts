import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchValidator(sourceKey: string, confirmKey: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const source = group.get(sourceKey)?.value;
    const confirm = group.get(confirmKey)?.value;

    return source === confirm ? null : { notMatching: true };
  };
}
