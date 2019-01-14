import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../_models';
import {HttpErrorResponse} from '@angular/common/http';

import {AuthenticationService} from '../_services';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.loginForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        let user = new User();
        user.username = this.f.username.value;
        user.password = this.f.password.value;
        this.authenticationService.login(user)
            .pipe()
            .subscribe(
                user => {
                    if (this.authenticationService.logInUser(user)) {
                        this.loading = false;
                        this.router.navigate([this.returnUrl]);
                    }
                },
                (err: HttpErrorResponse) => {
                    this.error = 'Invalid credentials';
                    console.log(err);
                    this.loading = false;
                });
    }
}
