import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private dataObserved = new BehaviorSubject<any>('');
  currentEvent = this.dataObserved.asObservable();
  constructor() { }

  publish(param):void {
    this.dataObserved.next(param);
  }
}
