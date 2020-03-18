import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/';
import { Contact, ContactState, State } from '../../models/contact';
import produce from 'immer';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactStateBehavior: BehaviorSubject<ContactState>;

  constructor() {
    this.contactStateBehavior = new BehaviorSubject<ContactState>(
      new ContactState(
        [
          new Contact('tata', false),
          new Contact('tete', false),
          new Contact('titi', false),
          new Contact('toto', true),
          new Contact('tutu', false)
        ],
        false
      )
    );
  }

  private setState(updater: (state: ContactState) => ContactState) {
    this.contactStateBehavior
      .next(
        updater( this.contactStateBehavior.getValue() )
      );
  }

  addNewContact(contactName: string) {
    if (contactName.length > 0) {
      this.setState(
        produce(
          (state: ContactState) => {
            state.contacts.push(
              new Contact(contactName, false)
            );

            state.contacts = state.contacts.sort(
              (a, b) => a.name.localeCompare(b.name)
            );
          }
        )
      );
    }
  }

  toggleFavourite(contactIndex: number) {
    this.setState(
      produce(
        (state: ContactState) => {
          state.contacts[contactIndex].isFavourite = ! state.contacts[contactIndex].isFavourite;
        }
      )
    );
  }

  showFavourites(onlyFavourite: boolean) {
    this.setState(
      produce(
        (state: ContactState) => {
          state.onlyFavourites = onlyFavourite;
        }
      )
    );
  }
}
