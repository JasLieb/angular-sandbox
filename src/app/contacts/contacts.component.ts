import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact';
import produce from 'immer';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: Array<Contact>;

  constructor() {
    this.contacts = [
      new Contact('toto', true),
      new Contact('tata', false),
      new Contact('titi', false),
      new Contact('tutu', false),
      new Contact('tete', false)
    ];
    this.contacts = this.sortContacts(this.contacts);
  }

  ngOnInit() {
  }

  addNewContact(contactName: string) {
    if (contactName.length > 0) {
      this.contacts =
        this.sortContacts(
          produce(this.contacts, draft => {
            draft.push(
              new Contact(contactName, false)
            );
          })
        );
    }
  }

  // Appel suite à un évènement
  onClickToggleFavourite(contactIndex: number) {
    this.contacts = this.toggleFavourite(this.contacts, contactIndex);
  }

  // Inner method
  toggleFavourite(contacts: Array<Contact>, contactIndex: number) {
    return produce(contacts, draft => {
      draft[contactIndex].isFavourite = ! draft[contactIndex].isFavourite;
    });
  }

  // Inner method
  sortContacts(contacts: Array<Contact>) {
    return produce(contacts, draft => {
      draft.sort(
        ( a: { name: string; }, b: { name: string; } ) => a.name.localeCompare(b.name)
      );
    });
  }
}
