import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { SimulationsComponent } from './simulations';
import { SimulationComponent } from './simulation';
import { LayersComponent } from './layers/layers.component';
import { ModulesFormComponent } from './modules-form/modules-form.component';

import { AuthGuard } from './_guards';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: LayersComponent, canActivate: [AuthGuard] },
    { path: 'simulations', component: SimulationsComponent, canActivate: [AuthGuard] },
    { path: 'simulations/:id', component: SimulationComponent, canActivate: [AuthGuard] },
    { path: 'modules', component: ModulesFormComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'dashboard' }
];

export const routing = RouterModule.forRoot(appRoutes);
