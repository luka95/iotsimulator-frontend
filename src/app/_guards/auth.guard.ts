import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {AuthenticationService} from '../_services';
import {AppComponent} from '../app.component';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthenticationService,
        private router: Router) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.authService.isLoggedIn
            .pipe(
                take(1),
                map((isLoggedIn: boolean) => {
                    console.log(AppComponent.environment === 'dev');
                    if (AppComponent.environment === 'dev') {
                        return true;
                    }
                    if (!isLoggedIn) {
                        this.router.navigate(['/login']);
                        return false;
                    }
                    return true;
                }));

    }


}
