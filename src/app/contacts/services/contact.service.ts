import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/';
import { Contact, ContactState } from '../../models/contact';
import produce from 'immer';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactState: ContactState;
  contactStateBehavior: BehaviorSubject<ContactState>;

  addUpdater = produce((state: ContactState, contactName: string) => {
    state.contacts.push(
      new Contact(contactName, false)
    );

    state.contacts = state.contacts.sort(
      (a, b) => a.name.localeCompare(b.name)
    );
  });

  favouriteContactUpdater = produce((state: ContactState, contactIndex: number) => {
    state.contacts[contactIndex].isFavourite = ! state.contacts[contactIndex].isFavourite;
  });

  onlyFavouriteUpdater = produce((state: ContactState, onlyFavourite: boolean) => {
    state.onlyFavourites = onlyFavourite;
  });

  constructor() {
    this.contactState = new ContactState([
        new Contact('tata', false),
        new Contact('tete', false),
        new Contact('titi', false),
        new Contact('toto', true),
        new Contact('tutu', false)
      ],
      false
    );

    this.contactStateBehavior = new BehaviorSubject<ContactState>(this.contactState);
  }

  setState(state: ContactState) {
    this.contactState = state;
    this.contactStateBehavior.next(this.contactState);
  }

  addNewContact(contactName: string) {
    if (contactName.length > 0) {
      this.setState(
        this.addUpdater(this.contactState, contactName)
      );
    }
  }

  toggleFavourite(contactIndex: number) {
    this.setState(
      this.favouriteContactUpdater(this.contactState, contactIndex)
    );
  }

  showFavourites(onlyFavourite: boolean) {
    this.contactStateBehavior.next(
      this.onlyFavouriteUpdater(this.contactState, onlyFavourite)
    );
  }
}
