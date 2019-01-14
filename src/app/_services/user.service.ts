import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {User} from '../_models';
import {AppComponent} from '../app.component';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http.get<User[]>(AppComponent.API_URL + `/users`);
    }

    getById(id: number) {
        return this.http.get(AppComponent.API_URL + `/users/` + id);
    }

    register(user: User) {
        return this.http.post(AppComponent.API_URL + `/users`, user);
    }

    delete(id: number) {
        return this.http.delete(AppComponent.API_URL + `/users/` + id);
    }
}
