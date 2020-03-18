import { OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

export class BaseComponent implements OnDestroy {
  contactSubcriptions: Array<Subscription>;

  constructor() {
    this.contactSubcriptions = new Array<Subscription>();
  }

  ngOnDestroy(): void {
    this.contactSubcriptions.forEach(sub => sub.unsubscribe());
  }
}
