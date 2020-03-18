import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact';
import produce from 'immer';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

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
  contacts: Array<Contact>;

  updater = produce((contacts, contactName) => {
    contacts.push(
      new Contact(contactName, false)
    );
    this.sortContacts(contacts);
  });

  ngOnInit() {}

  addNewContact(contactName: string) {
    if (contactName.length > 0) {
      this.contacts = this.updater(this.contacts, contactName);
    }
  }

  onClickToggleFavourite(contactIndex: number) {
    this.contacts = this.toggleFavourite(this.contacts, contactIndex);
  }

  toggleFavourite(contacts: Array<Contact>, contactIndex: number) {
    return produce(contacts, draft => {
      draft[contactIndex].isFavourite = ! draft[contactIndex].isFavourite;
    });
  }

  sortContacts(contacts: Array<Contact>): void {
    contacts.sort(
      ( a: { name: string; }, b: { name: string; } ) => a.name.localeCompare(b.name)
    );
  }
}
