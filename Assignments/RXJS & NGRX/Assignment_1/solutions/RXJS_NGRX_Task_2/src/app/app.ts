import { Component } from '@angular/core';
import { DashboardComponent } from './features/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DashboardComponent],
  templateUrl: './app.html'
})
export class App {}
