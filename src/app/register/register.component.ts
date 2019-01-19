import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../_models';
import { UserService } from '../_services';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    error: string;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService) {
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.registerForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        let user = new User();
        user.username = this.registerForm.value.username;
        user.password = this.registerForm.value.password;

        this.userService.register(user)
            
            .subscribe(
                user => {
                    this.loading = false;
                    this.router.navigate(['/login']);
                    console.log(user);
                },
                err => {
                    this.loading = false;
                    this.error = err;
                    console.log(err);
                });
    }
}
