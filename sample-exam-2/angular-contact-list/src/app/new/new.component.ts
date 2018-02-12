import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from 'app/contact.service';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.css'],
    providers: [ContactService]
})
export class NewComponent implements OnInit {
    contacts;
    name;
    phone;

    constructor(private _contactService: ContactService, private _router: Router) { }

    ngOnInit() {
        this.contacts = this._contactService.getContacts();
    }

    addContact() {
        const newContact = {
            name: this.name,
            phone: this.phone
        };
        this.contacts.push(newContact);
        this._contactService.addContact(newContact);
        this._router.navigateByUrl('/contact');
    }

}
