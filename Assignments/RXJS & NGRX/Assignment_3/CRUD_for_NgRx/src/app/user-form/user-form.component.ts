import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnChanges {
  @Input() user: User | null = null;
  @Output() saved = new EventEmitter<Omit<User, 'id'>>();
  @Output() cancelled = new EventEmitter<void>();

  private readonly fb = inject(FormBuilder);

  protected readonly isEditMode = signal(false);
  protected readonly userForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[\d\s\-+()]{7,15}$/)]]
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      this.isEditMode.set(!!this.user);
      if (this.user) {
        this.userForm.patchValue({
          name: this.user.name,
          email: this.user.email,
          phone: this.user.phone
        });
      } else {
        this.userForm.reset();
      }
    }
  }

  protected get name() { return this.userForm.controls.name; }
  protected get email() { return this.userForm.controls.email; }
  protected get phone() { return this.userForm.controls.phone; }

  protected onSubmit(): void {
    if (this.userForm.invalid) return;
    this.saved.emit(this.userForm.value as Omit<User, 'id'>);
    this.userForm.reset();
  }

  protected onCancel(): void {
    this.userForm.reset();
    this.cancelled.emit();
  }
}
