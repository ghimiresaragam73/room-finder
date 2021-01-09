import { NgModule } from '@angular/core';
/* import {AngularFireModule} from '@angular/fire' */
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth.routing';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyComponent } from './verify/verify.component';
/* import { FirebaseService } from './services/firebase.service'; */
/* import { PhoneAuthenticateComponent } from './phone-authenticate/phone-authenticate.component'; */


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    VerifyComponent,
   /*  PhoneAuthenticateComponent */
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    SharedModule,
    HttpClientModule,
    /* AngularFireModule.initializeApp({apiKey: "AIzaSyC6jApJlpwFk5J8hNtvV5PsqUi2cdI2VJw",
    authDomain: "roomfinder-2bcd8.firebaseapp.com",
    projectId: "roomfinder-2bcd8",
    storageBucket: "roomfinder-2bcd8.appspot.com",
    messagingSenderId: "1020232485339",
    appId: "1:1020232485339:web:4b9373cdf95f6c8514fffe",
    measurementId: "G-DEN4GYEP30"}) */
  ],
  providers: [AuthService]
})
export class AuthModule { }
