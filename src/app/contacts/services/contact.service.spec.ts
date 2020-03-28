import { TestBed } from '@angular/core/testing';

import { ContactService } from './contact.service';
import { ContactServiceCommands } from 'src/app/interfaces/contacts.service';

describe('ContactService', () => {
  let service: ContactServiceCommands;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
