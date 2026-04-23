import { Injectable, computed, effect, signal } from '@angular/core';

import { AuthAccount } from '@core/models/auth-account.model';

const AUTH_ACCOUNTS_KEY = 'angular-mock-auth-accounts';
const AUTH_SESSION_KEY = 'angular-mock-auth-session';

function readStorage<T>(key: string, fallback: T): T {
  if (typeof localStorage === 'undefined') {
    return fallback;
  }

  const rawValue = localStorage.getItem(key);

  if (!rawValue) {
    return fallback;
  }

  try {
    return JSON.parse(rawValue) as T;
  } catch {
    return fallback;
  }
}

@Injectable({
  providedIn: 'root'
})
export class MockAuthService {
  private readonly accountsState = signal<AuthAccount[]>(
    readStorage<AuthAccount[]>(AUTH_ACCOUNTS_KEY, [])
  );
  private readonly currentUserIdState = signal<string | null>(
    readStorage<string | null>(AUTH_SESSION_KEY, null)
  );

  readonly accounts = this.accountsState.asReadonly();
  readonly currentUser = computed(
    () => this.accountsState().find((account) => account.id === this.currentUserIdState()) ?? null
  );
  readonly isAuthenticated = computed(() => !!this.currentUser());
  readonly hasAccounts = computed(() => this.accountsState().length > 0);

  constructor() {
    effect(() => {
      if (typeof localStorage === 'undefined') {
        return;
      }

      localStorage.setItem(AUTH_ACCOUNTS_KEY, JSON.stringify(this.accountsState()));
    });

    effect(() => {
      if (typeof localStorage === 'undefined') {
        return;
      }

      const currentUserId = this.currentUserIdState();

      if (!currentUserId) {
        localStorage.removeItem(AUTH_SESSION_KEY);
        return;
      }

      localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(currentUserId));
    });
  }

  signup(payload: { fullName: string; email: string; password: string }): {
    success: boolean;
    message: string;
  } {
    const normalizedEmail = payload.email.trim().toLowerCase();

    if (this.accountsState().some((account) => account.email === normalizedEmail)) {
      return {
        success: false,
        message: 'Email nay da ton tai. Hay dang nhap hoac dung email khac.'
      };
    }

    const account: AuthAccount = {
      id: this.createAccountId(normalizedEmail),
      fullName: payload.fullName.trim(),
      email: normalizedEmail,
      password: payload.password,
      createdAt: new Date().toISOString()
    };

    this.accountsState.update((accounts) => [...accounts, account]);

    return {
      success: true,
      message: 'Tao tai khoan thanh cong. Hay dang nhap de vao admin.'
    };
  }

  login(email: string, password: string): { success: boolean; message: string } {
    const normalizedEmail = email.trim().toLowerCase();
    const account = this.accountsState().find((item) => item.email === normalizedEmail);

    if (!account) {
      return {
        success: false,
        message: 'Khong tim thay tai khoan. Hay dang ky truoc.'
      };
    }

    if (account.password !== password) {
      return {
        success: false,
        message: 'Mat khau khong dung.'
      };
    }

    this.currentUserIdState.set(account.id);

    return {
      success: true,
      message: 'Dang nhap thanh cong.'
    };
  }

  logout(): void {
    this.currentUserIdState.set(null);
  }

  private createAccountId(email: string): string {
    return `user-${email.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
  }
}
