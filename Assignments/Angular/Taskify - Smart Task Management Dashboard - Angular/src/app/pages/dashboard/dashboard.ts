import { Component } from '@angular/core';
import { AddTaskForm } from '../../components/addTaskForm/addTaskForm';
import { CarouselComponent } from './carousel.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  imports: [AddTaskForm, CarouselComponent],
})
export class Dashboard {}
