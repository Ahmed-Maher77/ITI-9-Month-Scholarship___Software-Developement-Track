import { Component, Output, EventEmitter } from '@angular/core';
import { ITask } from '../TaskCard/TaskCard';

@Component({
  selector: 'app-add-task-form',
  standalone: true,
  templateUrl: './addTaskForm.html',
  styleUrl: './addTaskForm.css',
})
export class AddTaskForm {
  @Output() addTask = new EventEmitter<ITask>();

  onSubmit(e: SubmitEvent) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const rawPriority = (formData.get('task-priority')?.toString() ?? 'Medium').toLowerCase();
    const priority = rawPriority === 'high' ? 'High' : rawPriority === 'low' ? 'Low' : 'Medium';

    const rawDueDate = formData.get('task-due-date')?.toString() ?? '';
    const task: ITask = {
      title: formData.get('task-title')?.toString() ?? '',
      description: formData.get('task-description')?.toString() ?? '',
      priority,
      category: formData.get('task-category')?.toString() ?? '',
      dueDate: rawDueDate,
    };
    // Save to localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.unshift(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.addTask.emit(task);
    form.reset();
  }
}
