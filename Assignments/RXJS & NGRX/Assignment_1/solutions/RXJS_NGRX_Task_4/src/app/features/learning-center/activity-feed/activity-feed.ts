import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectActivities } from '../../../store/selectors';
import { LearningState } from '../../../store/reducers';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-activity-feed',
  imports: [AsyncPipe, DatePipe],
  templateUrl: './activity-feed.html',
  styleUrl: './activity-feed.scss',
})
export class ActivityFeedComponent {
  private store = inject<Store<{ learning: LearningState }>>(Store);
  activities$ = this.store.select(selectActivities);

  getTypeIcon(type: string): string {
    switch (type) {
      case 'login': return '→';
      case 'logout': return '←';
      case 'enroll': return '+';
      case 'onboarding': return '●';
      default: return '○';
    }
  }

  trackById(_index: number, item: { id: string }): string {
    return item.id;
  }
}
