import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from "../_models/user";
import { map } from 'rxjs/operators';
import { AppComponent } from "../app.component";
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class AuthenticationService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get user() {
    var user = new User();
    var storedUser = JSON.parse(localStorage.getItem('currentUser'));
    user.username = storedUser.data.username;
    user.id = storedUser.data.id;
    return user;
  }

  constructor(private http: HttpClient) { }

  login(user: User) {

    return this.http.post<any>(AppComponent.API_URL + "/auth/login", user)
      .pipe(map(user => {

        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.loggedIn.next(true);
          console.log(user);
        }
        return user;
      }));
  }

  getTokenHeader() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let header = { Authorization: `Bearer ${currentUser.token}` };
    return header;
  }


  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('currentUser');
  }
}
