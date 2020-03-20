import { Contact } from '../contact.model';

export class ContactState {
  constructor(
    readonly contacts: Array<Contact>,
    readonly onlyFavourites: boolean
  ) {
  }
}
