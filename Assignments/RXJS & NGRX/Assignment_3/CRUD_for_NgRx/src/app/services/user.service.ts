import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly usersSignal = signal<User[]>([]);
  readonly users = this.usersSignal.asReadonly();

  private nextId = 1;

  addUser(user: Omit<User, 'id'>): User {
    const newUser: User = { ...user, id: String(this.nextId++) };
    this.usersSignal.update(users => [...users, newUser]);
    return newUser;
  }

  updateUser(id: string, changes: Partial<Omit<User, 'id'>>): void {
    this.usersSignal.update(users =>
      users.map(u => (u.id === id ? { ...u, ...changes } : u))
    );
  }

  deleteUser(id: string): void {
    this.usersSignal.update(users => users.filter(u => u.id !== id));
  }
}
