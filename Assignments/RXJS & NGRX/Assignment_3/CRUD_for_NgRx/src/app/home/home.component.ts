import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, UserFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private readonly userService = inject(UserService);

  protected readonly users = this.userService.users;
  protected readonly selectedUser = signal<User | null>(null);

  protected onAddUser(): void {
    this.selectedUser.set(null);
  }

  protected onEditUser(user: User): void {
    this.selectedUser.set(user);
  }

  protected onSaveUser(data: Omit<User, 'id'>): void {
    if (this.selectedUser()) {
      this.userService.updateUser(this.selectedUser()!.id, data);
    } else {
      this.userService.addUser(data);
    }
    this.selectedUser.set(null);
  }

  protected onCancelEdit(): void {
    this.selectedUser.set(null);
  }

  protected deleteUser(id: string): void {
    this.userService.deleteUser(id);
    if (this.selectedUser()?.id === id) {
      this.selectedUser.set(null);
    }
  }
}
