import { Component } from '@angular/core';
import { Contact } from '../../models/contact';
import { ContactService } from '../services/contact.service';
import { BaseComponent } from 'src/app/base.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService]
})
export class ContactsComponent extends BaseComponent {

  onlyFavourites: boolean;
  contacts: Array<Contact>;
  service: ContactService;
  constructor(public contactService: ContactService) {
    super();
    this.service = contactService;
    const contactBehavior = this.service.contactStateBehavior;
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
