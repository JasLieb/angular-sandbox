import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact';

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
  }

  ngOnInit() {
  }

  addNewUser(contactName: string) {
    if (contactName.length > 0) {
      this.contacts.push(
        new Contact(contactName, false)
      );
    }
  }
}
