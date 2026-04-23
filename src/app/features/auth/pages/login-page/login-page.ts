import { Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockAuthService } from '@core/services/mock-auth.service';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPageComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly authService = inject(MockAuthService);

  protected readonly statusMessage = signal('');

  protected readonly loginForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  private readonly queryParams = toSignal(
    this.route.queryParamMap.pipe(
      map((params) => ({
        email: params.get('email') ?? '',
        created: params.get('created') === '1',
        redirect: params.get('redirect') ?? '/workspace/admin/articles'
      }))
    ),
    {
      initialValue: {
        email: '',
        created: false,
        redirect: '/workspace/admin/articles'
      }
    }
  );

  constructor() {
    effect(() => {
      const params = this.queryParams();

      if (params.email && this.loginForm.controls.email.value !== params.email) {
        this.loginForm.patchValue({ email: params.email });
      }

      if (params.created) {
        this.statusMessage.set('Tao tai khoan thanh cong. Dang nhap de vao admin.');
      }
    });
  }

  protected submit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.statusMessage.set('Can nhap email va mat khau de dang nhap.');
      return;
    }

    const formValue = this.loginForm.getRawValue();
    const result = this.authService.login(formValue.email, formValue.password);

    this.statusMessage.set(result.message);

    if (!result.success) {
      return;
    }

    void this.router.navigateByUrl(this.queryParams().redirect || '/workspace/admin/articles');
  }
}
