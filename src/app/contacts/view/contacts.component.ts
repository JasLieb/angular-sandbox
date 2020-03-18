import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from '../../models/contact';
import { ContactService } from '../services/contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit, OnDestroy {

  contacts: Array<Contact>;
  contactsSubcription: Subscription;
  service: ContactService;

  constructor() {
    this.service = new ContactService();
    this.contactsSubcription =
      this.service.contactBehavior.subscribe(
        next => this.contacts = next
      );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.contactsSubcription.unsubscribe();
  }

  onClickAddNewContact(contactName: string) {
    this.service.addNewContact(contactName);
  }

  onClickToggleFavourite(contactIndex: number) {
    this.service.toggleFavourite(contactIndex);
  }
}
