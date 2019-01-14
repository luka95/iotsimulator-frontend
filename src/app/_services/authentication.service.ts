import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {User} from '../_models/user';
import {AppComponent} from '../app.component';
import {BehaviorSubject, Observable} from 'rxjs';


@Injectable()
export class AuthenticationService {
    private loggedIn = new BehaviorSubject<boolean>(false);

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    logInUser(user) {
        if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.loggedIn.next(true);
            console.log(user);
            return true;
        }
        return false;
    }

    get user() {
        const user = new User();
        const storedUser = JSON.parse(localStorage.getItem('currentUser'));
        user.username = storedUser.data.username;
        user.id = storedUser.data.id;
        return user;
    }

    constructor(private http: HttpClient) {
    }

    login(user: User): Observable<string> {
        return this.http.post<string>(AppComponent.API_URL + '/auth/login', user);
    }

    getTokenHeader() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const header = {Authorization: `Bearer ${currentUser.token}`};
        return header;
    }

    logout() {
        this.loggedIn.next(false);
        localStorage.removeItem('currentUser');
    }
}
