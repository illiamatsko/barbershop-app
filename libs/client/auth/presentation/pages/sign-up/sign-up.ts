import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { matchValidator, phoneNumberValidator } from '@barbershop-app/client/auth/infrastructure';
import { RouterLink } from '@angular/router';
import { FormField, PhoneInput } from '@barbershop-app/shared/ui';
import { SignUpUseCase } from '@barbershop-app/client/auth/application';
import { ErrorStore } from '@barbershop-app/client/core/application';
import { SignUpDto } from '@barbershop-app/client/auth/domain';
import { AuthForm } from '../auth-form/auth-form';


@Component({
  selector: 'app-sign-up',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    FormField,
    PhoneInput,
    AuthForm,
  ],
  templateUrl: './sign-up.html',
  styleUrls: ['./sign-up.css', '../form-styles.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUp {
  private signUpUseCase = inject(SignUpUseCase);
  private errorStore = inject(ErrorStore);
  error = this.errorStore.formError;

  signUpForm = new FormGroup(
    {
      email: new FormControl<string>('', {
        validators: [Validators.required, Validators.email],
      }),
      firstName: new FormControl<string>('', {
        validators: [Validators.required],
      }),
      lastName: new FormControl<string>('', {
        validators: [Validators.required],
      }),
      phoneNumber: new FormControl<string>('', {
        validators: [Validators.required, phoneNumberValidator],
      }),
      password: new FormControl<string>('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
      confirmPassword: new FormControl<string>('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    },
    {
      validators: [matchValidator('password', 'confirmPassword')],
    }
  );

  getError(errorCode: string, control: AbstractControl) {
    if (!control) return false;
    return control.touched && control.hasError(errorCode);
  }

  get confirmPasswordError() {
    return (
      this.signUpForm.hasError('notMatching') &&
      this.signUpForm.get('password')?.touched &&
      this.signUpForm.get('confirmPassword')?.touched
    );
  }

  onSubmit() {
    if (this.signUpForm.invalid) return;

    const { confirmPassword: _, ...user } = this.signUpForm.getRawValue();

    this.signUpUseCase.execute(user as SignUpDto);
  }
}
