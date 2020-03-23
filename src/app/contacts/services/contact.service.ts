import { Injectable } from '@angular/core';
import { Contact} from '../../models/contact.model';
import { ContactState } from '../../models/states/contact.state';
import produce, { Draft } from 'immer';
import { ContactServiceCommands } from 'src/app/interfaces/contacts.service';
import { StateUpdater } from 'src/app/interfaces/state.updater';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService implements StateUpdater<ContactState>, ContactServiceCommands {

  behavior: BehaviorSubject<ContactState>;

  constructor() {
    this.behavior = new BehaviorSubject<ContactState>(
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

  updateState(producer: (state: Draft<ContactState>) => void) {
    this.behavior
      .next(
        produce(this.behavior.value, producer)
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
