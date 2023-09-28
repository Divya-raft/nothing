import { Component } from '@angular/core';
import { CustomObservableService } from './custom-observable.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'APIs';
  constructor(private customObservable: CustomObservableService ){}

  startObserving(): void {
    this.customObservable.createObservable();
  }

  stopObserving(): void {
    this.customObservable.unsubscribeFrom();
  }
}
