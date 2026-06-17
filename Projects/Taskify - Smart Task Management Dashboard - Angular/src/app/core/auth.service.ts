import { Injectable, signal } from '@angular/core';

export interface AuthUser {
  email: string;
  fullName?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly storageKey = 'authData';
  private readonly authUserSignal = signal<AuthUser | null>(this.readFromStorage());

  readonly authUser = this.authUserSignal.asReadonly();

  isAuthenticated(): boolean {
    return this.authUserSignal() !== null;
  }

  saveAuth(user: AuthUser): void {
    this.authUserSignal.set(user);
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  logout(): void {
    this.authUserSignal.set(null);
    localStorage.removeItem(this.storageKey);
  }

  private readFromStorage(): AuthUser | null {
    const rawData = localStorage.getItem(this.storageKey);
    if (!rawData) return null;

    try {
      return JSON.parse(rawData) as AuthUser;
    } catch {
      localStorage.removeItem(this.storageKey);
      return null;
    }
  }
}
