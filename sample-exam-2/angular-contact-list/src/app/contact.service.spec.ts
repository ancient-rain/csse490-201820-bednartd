/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ContactService } from './contact.service';

describe('ContactService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ContactService]
        });
    });

    it('should be created', inject([ContactService], (service: ContactService) => {
        expect(service).toBeTruthy();
    }));

    it('should have initial non empty list of contacts', inject([ContactService], (service: ContactService) => {
        /* TODO: Complete this spec. */
        service.getContacts();
        expect(1).toBe(2);
    }));

    it('should delete a contact', inject([ContactService], (service: ContactService) => {
       /* TODO: Complete this spec. */
       expect(1).toBe(2);
    }));

    it('should update a contact', inject([ContactService], (service: ContactService) => {
        /* TODO: Complete this spec. */
        expect(1).toBe(2);
    }));

    it('should add a contact', inject([ContactService], (service: ContactService) => {
        /* TODO: Complete this spec. */
        expect(1).toBe(2);
    }));
});
