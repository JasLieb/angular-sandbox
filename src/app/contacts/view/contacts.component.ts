import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from '../../models/contact';
import { ContactService } from '../services/contact.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit, OnDestroy {

  onlyFavourites: boolean;
  contacts: Array<Contact>;
  service: ContactService;
  contactSubcriptions: Array<Subscription>;

  constructor() {
    this.service = new ContactService();
    const contactBehavior = this.service.contactStateBehavior;
    this.contactSubcriptions = new Array<Subscription>();
    this.contactSubcriptions.push(
      contactBehavior
      .subscribe(
        next => {
          const onlyFavourites = next.onlyFavourites;
          this.contacts = next.contacts.filter(c => !onlyFavourites || c.isFavourite === onlyFavourites);
        }
      )
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.contactSubcriptions.forEach(sub => sub.unsubscribe());
  }

  onClickAddNewContact(contactName: string) {
    this.service.addNewContact(contactName);
  }

  onClickToggleFavourite(contactIndex: number) {
    this.service.toggleFavourite(contactIndex);
  }

  onClickToggleShowFavourite(onlyFavourites: boolean) {
    this.service.showFavourites(onlyFavourites);
  }
}
