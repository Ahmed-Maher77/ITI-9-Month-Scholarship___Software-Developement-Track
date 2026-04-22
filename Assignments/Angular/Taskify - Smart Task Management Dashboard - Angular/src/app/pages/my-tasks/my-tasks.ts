import { Component } from '@angular/core';
import { TaskList } from '../../components/TaskList/TaskList';
import type { ITask } from '../../components/TaskCard/TaskCard';

@Component({
  selector: 'app-my-tasks',
  standalone: true,
  templateUrl: './my-tasks.html',
  styleUrl: './my-tasks.css',
  imports: [TaskList],
})
export class MyTasks {
  tasks: ITask[] = [];

  private defaultTasks: ITask[] = [
    {
      title: 'Prepare sprint planning notes',
      description:
        "Compile backlog priorities and dependencies before tomorrow's planning meeting.",
      priority: 'High',
      category: 'Work',
      dueDate: 'Due: Apr 16',
      status: 'in-progress',
    },
    {
      title: 'Update portfolio case study',
      description: 'Refine project screenshots and add measurable results from the latest release.',
      priority: 'Medium',
      category: 'Personal',
      dueDate: 'Due: Apr 20',
      status: 'in-progress',
    },
    {
      title: 'Review Angular standalone APIs',
      description: 'Read migration notes and summarize recommended patterns for upcoming tasks.',
      priority: 'Low',
      category: 'Study',
      dueDate: 'Due: Apr 21',
      status: 'in-progress',
    },
  ];

  constructor() {
    const stored = localStorage.getItem('tasks');
    if (stored) {
      const parsed = JSON.parse(stored);
      this.tasks = Array.isArray(parsed) && parsed.length > 0 ? parsed : this.defaultTasks;
    } else {
      this.tasks = this.defaultTasks;
    }
  }
}
