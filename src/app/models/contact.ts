export class Contact {
    constructor(
      readonly name: string,
      readonly isFavourite: boolean
    ) {
    }
}

export class ContactState {
  constructor(
    readonly contacts: Array<Contact>,
    readonly onlyFavourites: boolean
  ) {
  }
}
