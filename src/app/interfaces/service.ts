import { ContactState } from '../models/states/contactState';
import { BehaviorSubject } from 'rxjs';

export interface IContactService<TState extends ContactState> {

  behavior: BehaviorSubject<TState>;

  addNewContact(contactName: string): void;
  toggleFavourite(contactIndex: number): void;
  showFavourites(onlyFavourite: boolean): void;
}
