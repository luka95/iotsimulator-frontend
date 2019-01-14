import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    static API_URL = 'http://localhost:8080/api';
    static environment = 'dev';

    constructor() {
    }

    ngOnInit() {
    }
}
