import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';


@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignIn {
  private authService = inject(AuthService);

  showError = signal<boolean>(false);
  errorMessage = signal<string>('');

  signInForm = new FormGroup(
    {
      email: new FormControl<string>('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl<string>('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    },
    {
      updateOn: 'blur'
    }
  );

  getError(errorCode: string, control: AbstractControl) {
    if (!control) return false;
    return control.touched && control.dirty && control.hasError(errorCode);
  }

  onSubmit() {
    if (this.signInForm.invalid) return;

    const { email, password } = this.signInForm.getRawValue();
    if(!email || !password) return;

    this.authService.signIn(email, password);
  }
}
