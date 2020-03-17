import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: any;

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

}
