import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { FormField } from '@barbershop-app/ui';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, ReactiveFormsModule, FormField, RouterLink],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignIn {
  private authService = inject(AuthService);
  errorMessage = computed(() => this.authService.error());

  signInForm = new FormGroup(
    {
      email: new FormControl<string>('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl<string>('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    }
  );

  getError(errorCode: string, control: AbstractControl) {
    if (!control) return false;
    return control.touched && control.hasError(errorCode);
  }

  onSubmit() {
    if (this.signInForm.invalid) return;

    const { email, password } = this.signInForm.getRawValue();
    if (!email || !password) return;

    this.authService.signIn(email, password);
  }
}
