export class Init {
    load() {
        if  (sessionStorage.getItem('contacts') === null ||
            sessionStorage.getItem('contacts') === undefined) {
            console.log('No contacts found!... Creating...');
            const contacts = [
                {
                    name: 'John Snow',
                    phone: '(435) 294-8888'
                },
                {
                    name: 'Sansa Stark',
                    phone: '(435) 294-7777'
                },
                {
                    name: 'Brandon Stark',
                    phone: '(435) 294-4444'
                },
                {
                    name: 'Arya Stark',
                    phone: '(435) 294-5555'
                }
            ];
            sessionStorage.setItem('contacts', JSON.stringify(contacts));
            return;
        } else {
            console.log('Found Contacts.');
        }
    }
}
