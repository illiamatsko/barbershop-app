import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormField } from '@barbershop-app/shared/presentation';
import { RouterLink } from '@angular/router';
import { SignInUseCase } from '@barbershop-app/client/auth/application';
import { ErrorStore } from '@barbershop-app/client/core/application';
import { AuthForm } from '../auth-form/auth-form';


@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, ReactiveFormsModule, FormField, RouterLink, AuthForm],
  templateUrl: './sign-in.html',
  styleUrls: ['./sign-in.css', '../form-styles.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignIn {
  private signInUseCase = inject(SignInUseCase);
  private errorStore = inject(ErrorStore);
  error = this.errorStore.formError;

  signInForm = new FormBuilder().nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  getError(errorCode: string, control: AbstractControl) {
    if (!control) return false;
    return control.touched && control.hasError(errorCode);
  }

  onSubmit() {
    if (this.signInForm.invalid) return;

    const { email, password } = this.signInForm.getRawValue();

    this.signInUseCase.execute({ email, password });
  }
}
