import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { MockAuthService } from '@core/services/mock-auth.service';

@Component({
  selector: 'app-signup-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup-page.html',
  styleUrl: './signup-page.scss'
})
export class SignupPageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(MockAuthService);

  protected readonly statusMessage = signal('');

  protected readonly signupForm = this.formBuilder.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  });

  protected submit(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      this.statusMessage.set('Can dien day du thong tin de tao tai khoan.');
      return;
    }

    const formValue = this.signupForm.getRawValue();

    if (formValue.password !== formValue.confirmPassword) {
      this.statusMessage.set('Mat khau nhap lai khong khop.');
      return;
    }

    const result = this.authService.signup({
      fullName: formValue.fullName,
      email: formValue.email,
      password: formValue.password
    });

    this.statusMessage.set(result.message);

    if (!result.success) {
      return;
    }

    void this.router.navigate(['/auth/login'], {
      queryParams: {
        email: formValue.email,
        created: '1'
      }
    });
  }
}
