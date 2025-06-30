import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { matchValidator } from '../../validators/match.validator';
import { FormField } from '@barbershop-app/ui';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, ReactiveFormsModule, FormField, RouterLink],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUp {
  private authService = inject(AuthService);
  errorMessage = computed(() => this.authService.error());

  signUpForm = new FormGroup(
    {
      email: new FormControl<string>('', {
        validators: [Validators.required, Validators.email],
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

    const { email, password } = this.signUpForm.getRawValue();
    if (!email || !password) return;

    this.authService.signUp(email, password);
  }
}
