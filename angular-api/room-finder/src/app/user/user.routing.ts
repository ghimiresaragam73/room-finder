import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { ProfileComponent } from './profile/profile.component';

const userRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    }, {
        path: 'profile',
        component: ProfileComponent
    }, {
        path: 'change-password',
        component: PasswordChangeComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(userRoutes)],
    exports: [RouterModule]
})

export class UserRoutingModule {

}