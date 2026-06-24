import { Component, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, Subscription } from 'rxjs';
import { Activity } from '../../../core/models';

@Component({
  selector: 'app-observable-demo',
  imports: [],
  templateUrl: './observable-demo.html',
  styleUrl: './observable-demo.scss',
})
export class ObservableDemoComponent implements OnDestroy {
  private subject = new Subject<string>();
  private behaviorSubject = new BehaviorSubject<string>('No events yet');

  subjectSubA: string[] = [];
  subjectSubB: string[] = [];
  behaviorSubA: string[] = [];
  behaviorSubB: string[] = [];

  hasSubA = false;
  hasSubB = false;
  hasBehaviorSubA = false;
  hasBehaviorSubB = false;

  private subASubscription?: Subscription;
  private subBSubscription?: Subscription;
  private behaviorSubASubscription?: Subscription;
  private behaviorSubBSubscription?: Subscription;

  ngOnDestroy(): void {
    this.subASubscription?.unsubscribe();
    this.subBSubscription?.unsubscribe();
    this.behaviorSubASubscription?.unsubscribe();
    this.behaviorSubBSubscription?.unsubscribe();
  }

  emitEvent(): void {
    const event = `Event ${new Date().toLocaleTimeString()}`;
    this.subject.next(event);
    this.behaviorSubject.next(event);
  }

  addSubscriberA(): void {
    if (this.hasSubA) return;
    this.hasSubA = true;
    this.subjectSubA = [];
    this.subASubscription = this.subject.subscribe((value) => {
      this.subjectSubA = [...this.subjectSubA, value];
    });
    this.behaviorSubA = [];
    this.behaviorSubASubscription = this.behaviorSubject.subscribe((value) => {
      this.behaviorSubA = [...this.behaviorSubA, value];
    });
  }

  addSubscriberB(): void {
    if (this.hasSubB) return;
    this.hasSubB = true;
    this.subjectSubB = [];
    this.subBSubscription = this.subject.subscribe((value) => {
      this.subjectSubB = [...this.subjectSubB, value];
    });
    this.behaviorSubB = [];
    this.behaviorSubBSubscription = this.behaviorSubject.subscribe((value) => {
      this.behaviorSubB = [...this.behaviorSubB, value];
    });
  }

  reset(): void {
    this.subASubscription?.unsubscribe();
    this.subBSubscription?.unsubscribe();
    this.behaviorSubASubscription?.unsubscribe();
    this.behaviorSubBSubscription?.unsubscribe();

    this.subjectSubA = [];
    this.subjectSubB = [];
    this.behaviorSubA = [];
    this.behaviorSubB = [];

    this.hasSubA = false;
    this.hasSubB = false;
    this.hasBehaviorSubA = false;
    this.hasBehaviorSubB = false;

    this.subject = new Subject<string>();
    this.behaviorSubject = new BehaviorSubject<string>('No events yet');
  }
}
