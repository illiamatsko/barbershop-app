import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  ReactiveFormsModule,
  Validators,
  FormBuilder
} from '@angular/forms';
import { matchValidator, phoneNumberValidator } from '@barbershop-app/client/auth/infrastructure';
import { Router, RouterLink } from '@angular/router';
import { FormField, PhoneInput } from '@barbershop-app/client/shared/presentation';
import { SignUpUseCase } from '@barbershop-app/client/auth/application';
import { ErrorStore } from '@barbershop-app/client/core/application';
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
  private router = inject(Router);
  private signUpUseCase = inject(SignUpUseCase);
  private errorStore = inject(ErrorStore);
  error = this.errorStore.formError;

  signUpForm = new FormBuilder().nonNullable.group(
    {
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, phoneNumberValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
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

    this.signUpUseCase.execute(user).subscribe((res) => {
      if (res) {
        this.router.navigate(['/']).then();
        this.signUpForm.reset();
      } else {
        this.errorStore.setFormError(
          'Something went wrong. Please try again later.'
        );
      }
    });
  }
}
