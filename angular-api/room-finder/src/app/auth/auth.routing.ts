import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

import { LoginComponent } from './login/login.component';
/* import { PhoneAuthenticateComponent } from "./phone-authenticate/phone-authenticate.component"; */
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyComponent } from "./verify/verify.component";

const authRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    }, {
        path: 'register',
        component: RegisterComponent
    }, {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    }, {
        path: 'reset-password/:id',
        component: ResetPasswordComponent
    }, {
        path: 'verify/email/:id',
        component: VerifyComponent
    }/* ,{
        path: 'verify/phone/:phone',
        component:PhoneAuthenticateComponent
    } */
]

@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule]
})

export class AuthRoutingModule {

}