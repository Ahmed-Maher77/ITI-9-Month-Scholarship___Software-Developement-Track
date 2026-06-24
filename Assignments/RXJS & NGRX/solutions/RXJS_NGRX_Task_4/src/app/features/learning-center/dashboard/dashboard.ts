import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ControlsComponent } from '../controls/controls';
import { ActivityFeedComponent } from '../activity-feed/activity-feed';
import { OnboardingProgressComponent } from '../onboarding-progress/onboarding-progress';
import { ObservableDemoComponent } from '../observable-demo/observable-demo';
import { selectLearningState } from '../../../store/selectors';
import { LearningState } from '../../../store/reducers';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    ControlsComponent,
    ActivityFeedComponent,
    OnboardingProgressComponent,
    ObservableDemoComponent,
    AsyncPipe,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent {
  private store = inject<Store<{ learning: LearningState }>>(Store);
  state$ = this.store.select(selectLearningState);
}
