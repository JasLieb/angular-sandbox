import { OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

export class BaseComponent implements OnDestroy {
  subcriptions: Array<Subscription>;

  constructor() {
    this.subcriptions = new Array<Subscription>();
  }

  ngOnDestroy(): void {
    this.subcriptions.forEach(sub => sub.unsubscribe());
  }
}
