import { Component } from '@angular/core';
import { Contact } from '../../models/contact';
import { BaseComponent } from 'src/app/base.component';
import { IContactService } from 'src/app/interfaces/service';
import { ContactState } from 'src/app/models/states/contactState';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent extends BaseComponent {

  onlyFavourites: boolean;
  contacts: Array<Contact>;
  service: IContactService<ContactState>;
  constructor() {
    super();
    this.service = new ContactService();
    const contactBehavior = this.service.behavior;
    this.subcriptions.push(
      contactBehavior
      .subscribe(
        next => {
          const onlyFavourites = next.onlyFavourites;
          this.contacts = next.contacts.filter(c => !onlyFavourites || c.isFavourite === onlyFavourites);
        }
      )
    );
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
