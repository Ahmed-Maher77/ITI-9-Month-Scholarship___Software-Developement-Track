import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.html',
  styleUrl: './signup.css',
  imports: [CommonModule, ReactiveFormsModule],
})
export class Signup {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  isSubmitted = false;

  signupForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  onSubmit(): void {
    this.isSubmitted = true;

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.authService.saveAuth({
      fullName: this.signupForm.controls.fullName.value ?? '',
      email: this.signupForm.controls.email.value ?? '',
    });

    this.router.navigateByUrl('/profile');
  }
}
