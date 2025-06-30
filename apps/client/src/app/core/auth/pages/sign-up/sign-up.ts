import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { matchValidator } from '../../validators/match.validator';
import { isEmailUnique } from '../../validators/isEmailUnique';

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUp {
  private authService = inject(AuthService);

  errorMessage = computed(() => this.authService.error())

  signInForm = new FormGroup(
    {
      email: new FormControl<string>('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [isEmailUnique]
      }),
      password: new FormControl<string>('', {
        validators: [Validators.required, Validators.minLength(6)]
      }),
      confirmPassword: new FormControl<string>('', {
        validators: [Validators.required, Validators.minLength(6)]
      })
    },
    {
      validators: [matchValidator('password', 'confirmPassword')]
    }
  );

  getError(errorCode: string, control: AbstractControl) {
    if (!control) return false;
    return control.touched && control.hasError(errorCode);
  }

  get confirmPasswordError() {
    return this.signInForm.hasError('notMatching') &&
    this.signInForm.get('password')?.touched &&
    this.signInForm.get('confirmPassword')?.touched;
  }

  onSubmit() {
    if (this.signInForm.invalid) return;

    const { email, password } = this.signInForm.getRawValue();
    if(!email || !password) return;

    this.authService.signUp(email, password);
  }
}
