import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { login, logout, enrollInCourse } from '../../../store/actions';
import { User } from '../../../core/models';
import { selectIsLoggedIn } from '../../../store/selectors';
import { LearningState } from '../../../store/reducers';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-controls',
  imports: [AsyncPipe],
  templateUrl: './controls.html',
  styleUrl: './controls.scss',
})
export class ControlsComponent {
  private store = inject<Store<{ learning: LearningState }>>(Store);
  isLoggedIn$ = this.store.select(selectIsLoggedIn);

  onLogin(): void {
    const user: User = {
      id: crypto.randomUUID(),
      name: 'Alex Johnson',
      email: 'alex.johnson@example.com',
    };
    this.store.dispatch(login({ user }));
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }

  onEnroll(): void {
    this.store.dispatch(enrollInCourse({ courseName: 'Angular Course' }));
  }
}
