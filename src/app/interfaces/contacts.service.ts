import { ContactState } from '../models/states/contact.state';
import { BehaviorSubject } from 'rxjs';

export interface ContactServiceCommands {

  behavior: BehaviorSubject<ContactState>;

  addNewContact(contactName: string): void;
  toggleFavourite(contactIndex: number): void;
  showFavourites(onlyFavourite: boolean): void;
}
