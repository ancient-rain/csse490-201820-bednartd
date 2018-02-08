export class User {

    username: string;
    name: string;
    email: string;
    password: string;

    static isCorrectUsername(username: string) {
        const userString =  sessionStorage.getItem('registeredUser');
        const user = JSON.parse(userString);
        return user && user.username === username;
    }

    static isCorrectPassword(password: string) {
        const userString =  sessionStorage.getItem('registeredUser');
        const user = JSON.parse(userString);
        return user && user.password === password;
    }

    static hasRegisteredUser() {
        const userString =  sessionStorage.getItem('registeredUser');
        const user = JSON.parse(userString);
        return user && user.username  && user.password ? true : false;
    }

    constructor( name: string, email: string, username: string,
                 password: string) {
        this.name = name;
        this.email = email;
        this.username = username;
        this.password = password;
        this.save();
    }

    save() {
        sessionStorage.setItem('registeredUser', JSON.stringify(this, null, 4));
    }

}
