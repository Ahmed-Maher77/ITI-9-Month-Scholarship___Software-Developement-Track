import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface ITask {
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  category: string;
  dueDate: string;
  status?: 'in-progress' | 'done';
}

@Component({
  selector: 'app-task-card',
  standalone: true,
  templateUrl: './TaskCard.html',
  styleUrl: './TaskCard.css',
})
export class TaskCard {
  @Input() taskData?: ITask;
  @Input() taskIndex!: number;

  @Output() delete = new EventEmitter<number>();
  @Output() update = new EventEmitter<number>();
  @Output() complete = new EventEmitter<number>();
}
