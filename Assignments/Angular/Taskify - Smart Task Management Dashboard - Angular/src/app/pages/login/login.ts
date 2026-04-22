import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [FormsModule],
})
export class Login {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  loginData = {
    email: '',
    password: '',
  };

  onSubmit(): void {
    this.authService.saveAuth({
      email: this.loginData.email,
    });
    this.router.navigateByUrl('/profile');
  }
}
