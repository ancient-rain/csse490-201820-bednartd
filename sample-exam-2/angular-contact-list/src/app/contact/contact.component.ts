import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css'],
    providers: [ ContactService ]
})
export class ContactComponent implements OnInit {
    contacts;
    name;
    phone;
    oldName;
    oldPhone;
    appState = 'display';

    constructor(private _contactService: ContactService) { }

    ngOnInit() {
        this.contacts = this._contactService.getContacts();
    }

    deleteContact(index) {
        this.contacts.splice(index, 1);
        this._contactService.deleteContact(index);
    }

    editContact(contact) {
        this.appState = 'edit';
        this.oldName = contact.name;
        this.oldPhone = contact.phone;
        this.name = contact.name;
        this.phone = contact.phone;
    }

    updateContact() {
        this.appState = 'display';
        for (let i = 0; i < this.contacts.length; i++) {
            if ( this.contacts[i].name === this.oldName) {
                this.contacts[i].name = this.name;
            } else if (this.contacts[i].phone === this.oldPhone) {
                this.contacts[i].phone = this.phone;
            }
        }
        this._contactService.updateContact(this.oldName, this.name, this.oldPhone, this.phone);
    }
}
