export class Contact {
    name: string;
    isFavourite: boolean;

    constructor(name: string, isFavourite: boolean) {
        this.name = name;
        this.isFavourite = isFavourite;
    }
}

export class ContactState {
  contacts: Array<Contact>;
  onlyFavourites: boolean;

  constructor(contacts: Array<Contact>, onlyFavourites: boolean) {
    this.contacts = contacts;
    this.onlyFavourites = onlyFavourites;
  }
}
