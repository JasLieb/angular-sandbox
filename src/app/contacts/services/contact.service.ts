import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/';
import { Contact } from '../../models/contact';
import produce from 'immer';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Array<Contact>;
  contactBehavior: BehaviorSubject<Array<Contact>>;

  addUpdater = produce((contacts: Array<Contact>, contactName) => {
    contacts.push(
      new Contact(contactName, false)
    );

    contacts = contacts.sort(
      (a, b) => a.name.localeCompare(b.name)
    );
  });

  constructor() {
    this.contacts = [
      new Contact('tata', false),
      new Contact('tete', false),
      new Contact('titi', false),
      new Contact('toto', true),
      new Contact('tutu', false)
    ];

    this.contactBehavior = new BehaviorSubject<Array<Contact>>(
      this.contacts
    );
  }

  setContacts(contacts: Contact[]) {
    this.contacts = contacts;
    this.contactBehavior.next(this.contacts);
  }

  addNewContact(contactName: string) {
    if (contactName.length > 0) {
      this.setContacts(
        this.addUpdater(this.contacts, contactName)
      );
    }
  }

  toggleFavourite(contactIndex: number) {
    return produce(this.contacts, draft => {
      draft[contactIndex].isFavourite = ! draft[contactIndex].isFavourite;
    });
  }
}
