import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Activity } from '../models';

@Injectable({ providedIn: 'root' })
export class ActivityService {
  private activitySubject = new Subject<Activity>();
  private activityBehaviorSubject = new BehaviorSubject<Activity | null>(null);

  activity$: Observable<Activity> = this.activitySubject.asObservable();
  activityBehavior$: Observable<Activity | null> = this.activityBehaviorSubject.asObservable();

  subjectLog: Activity[] = [];
  behaviorSubjectLog: Activity[] = [];

  private subACounter = 0;
  private subBCounter = 0;

  emitViaSubject(activity: Activity): void {
    this.subjectLog.push(activity);
    this.activitySubject.next(activity);
  }

  emitViaBehaviorSubject(activity: Activity): void {
    this.behaviorSubjectLog.push(activity);
    this.activityBehaviorSubject.next(activity);
  }

  getSubjectLog(): Activity[] {
    return [...this.subjectLog];
  }

  getBehaviorSubjectLog(): Activity[] {
    return [...this.behaviorSubjectLog];
  }

  getSubACount(): number {
    return this.subACounter;
  }

  getSubBCount(): number {
    return this.subBCounter;
  }

  incrementSubA(): void {
    this.subACounter++;
  }

  incrementSubB(): void {
    this.subBCounter++;
  }

  resetSubjectDemo(): void {
    this.subjectLog = [];
    this.behaviorSubjectLog = [];
    this.subACounter = 0;
    this.subBCounter = 0;
  }
}
