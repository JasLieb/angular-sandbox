import { Contact } from '../contact';

export class ContactState {
  constructor(
    readonly contacts: Array<Contact>,
    readonly onlyFavourites: boolean
  ) {
  }
}
