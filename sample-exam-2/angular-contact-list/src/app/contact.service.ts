import { Injectable } from '@angular/core';
import { Init } from './init.contacts';

@Injectable()
export class ContactService extends Init {
    constructor() {
        super();
        console.log('ContactService initialized!!');
        this.load();
    }

    getContacts() {
        const contacts = JSON.parse(sessionStorage.getItem('contacts'));
        return contacts;
    }

    addContact(newContact) {
        const contacts = JSON.parse(sessionStorage.getItem('contacts'));
        // add new contact
        contacts.push(newContact);
        // save updated contacts
        sessionStorage.setItem('contacts', JSON.stringify(contacts));
    }

    deleteContact(index) {
        const contacts = JSON.parse(sessionStorage.getItem('contacts'));
        // remove contact at index
        contacts.splice(index, 1);
        // save updated contacts
        sessionStorage.setItem('contacts', JSON.stringify(contacts));
    }

    updateContact(oldName, newName, oldPhone, newPhone) {
        const contacts = JSON.parse(sessionStorage.getItem('contacts'));

        for (let i = 0; i < contacts.length; i++) {
            if (contacts[i].name === oldName) {
                if (contacts[i].phone === oldPhone) {
                    contacts[i].phone = newPhone;
                    contacts[i].name = newName;
                }
            }
        }
        // save updated contacts
        sessionStorage.setItem('contacts', JSON.stringify(contacts));
    }
}
