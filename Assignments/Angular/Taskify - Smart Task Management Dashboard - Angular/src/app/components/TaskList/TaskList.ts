import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import type { ITask } from '../TaskCard/TaskCard';
import { TaskCard } from '../TaskCard/TaskCard';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './TaskList.html',
  styleUrl: './TaskList.css',
  imports: [TaskCard, NgFor, NgIf],
})
export class TaskList implements OnChanges, OnDestroy {
  @Input() tasks: ITask[] = [];
  @Input() task: ITask | null = null;

  activeTab: 'all' | 'done' | 'in-progress' = 'all';
  toastMessage = '';
  isToastVisible = false;
  private toastShowDelayTimeout: ReturnType<typeof setTimeout> | null = null;
  private toastHideTimeout: ReturnType<typeof setTimeout> | null = null;
  constructor(private cdr: ChangeDetectorRef) {}

  setActiveTab(tab: 'all' | 'done' | 'in-progress') {
    if (this.activeTab === tab) return;

    const previousTab = this.activeTab;
    this.activeTab = tab;
    this.showToast(`${this.formatTabLabel(previousTab)} tab closed`);
  }

  get filteredTaskEntries(): { task: ITask; index: number }[] {
    return this.tasks
      .map((task, index) => ({ task, index }))
      .filter(({ task }) => {
        if (this.activeTab === 'all') return true;
        return (task.status ?? 'in-progress') === this.activeTab;
      });
  }

  get emptyStateMessage(): string {
    if (this.activeTab === 'done') return 'No completed tasks yet.';
    if (this.activeTab === 'in-progress') return 'No in-progress tasks right now.';
    return 'No tasks available.';
  }

  ngOnChanges(changes: SimpleChanges): void {
    const taskChange = changes['task'];
    if (!taskChange?.currentValue) return;
    this.tasks = [{ ...taskChange.currentValue }, ...this.tasks];
  }

  ngOnDestroy(): void {
    this.clearToastTimers();
  }

  closeToast(): void {
    this.isToastVisible = false;
    this.clearToastTimers();
    this.cdr.detectChanges();
  }

  onDeleteTask(taskIndex: number): void {
    this.tasks = this.tasks.filter((_, index) => index !== taskIndex);
  }

  onUpdateTask(taskIndex: number): void {
    const currentTask = this.tasks[taskIndex];
    if (!currentTask) return;

    const updatedTitle = window.prompt('Update task title', currentTask.title);
    if (!updatedTitle?.trim()) return;

    this.tasks = this.tasks.map((task, index) =>
      index === taskIndex ? { ...task, title: updatedTitle.trim() } : task,
    );
  }

  onCompleteTask(taskIndex: number): void {
    this.tasks = this.tasks.map((task, index) =>
      index === taskIndex
        ? { ...task, status: task.status === 'done' ? 'in-progress' : 'done' }
        : task,
    );
  }

  private showToast(message: string): void {
    this.clearToastTimers();
    this.toastMessage = message;
    this.isToastVisible = false;

    this.toastShowDelayTimeout = setTimeout(() => {
      this.isToastVisible = true;
      this.cdr.detectChanges();
    }, 260);

    this.toastHideTimeout = setTimeout(() => {
      this.isToastVisible = false;
      this.cdr.detectChanges();
    }, 2600);
  }

  private formatTabLabel(tab: 'all' | 'done' | 'in-progress'): string {
    if (tab === 'done') return 'Done';
    if (tab === 'in-progress') return 'In Progress';
    return 'All';
  }

  private clearToastTimers(): void {
    if (this.toastShowDelayTimeout) {
      clearTimeout(this.toastShowDelayTimeout);
      this.toastShowDelayTimeout = null;
    }

    if (this.toastHideTimeout) {
      clearTimeout(this.toastHideTimeout);
      this.toastHideTimeout = null;
    }
  }
}
