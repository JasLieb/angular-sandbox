import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/';
import { Contact, ContactState } from '../../models/contact';
import produce, { Draft } from 'immer';

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

  private updateState(producer: (state: Draft<ContactState>) => void) {
    this.contactStateBehavior
      .next(
        produce(this.contactStateBehavior.value, producer)
      );
  }

  addNewContact(contactName: string) {
    if (contactName.length > 0) {
      this.updateState(
        (state: Draft<ContactState>) => {
          state.contacts.push(
            new Contact(contactName, false)
          );

          state.contacts = state.contacts.sort(
            (a, b) => a.name.localeCompare(b.name)
          );
        }
      );
    }
  }

  toggleFavourite(contactIndex: number) {
    this.updateState(
      (state: Draft<ContactState>) => {
        state.contacts[contactIndex].isFavourite = ! state.contacts[contactIndex].isFavourite;
      }
    );
  }

  showFavourites(onlyFavourite: boolean) {
    this.updateState(
      (state: Draft<ContactState>) => {
        state.onlyFavourites = onlyFavourite;
      }
    );
  }
}
