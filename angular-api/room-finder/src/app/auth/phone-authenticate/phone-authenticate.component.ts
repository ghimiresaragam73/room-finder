/* import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import firebase  from 'firebase/app'
import 'firebase/auth';
import { ActivatedRoute, Router } from "@angular/router";
import { MsgService } from "src/app/shared/services/msg.service";
import { WindowService } from "../service/window.service"; */
/* import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import * as ngFirebase from '@angular/fire'
import { WindowService } from '../service/window.service';
import {} from ''

@Component({
  selector: 'app-phone-authenticate',
  templateUrl: './phone-authenticate.component.html',
  styleUrls: ['./phone-authenticate.component.css']
})
export class PhoneAuthenticateComponent implements OnInit {
  windowRef: any;
  phoneNumber;
  verificationCode: string;
  user: any;
  constructor(
    private win: WindowService
  ) { }

  ngOnInit(): void {
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth().RecaptchaVerifier('recaptcha-container');
    this.windowRef.recaptchaVerifier.render();
  }
  sendCode(){
    const appVerifier = this.windowRef.recaptchaVerifier;
    const num = this.phoneNumber;
    firebase.auth().signInWithPhoneNumber(num,appVerifier)
    .then(
      result=>{
        this.windowRef.confirmationResult = result;
      })
      .catch(
        err=>console.log(err)
      )
  }
  verifyLoginCode(){
    this.windowRef.confirmationResult
    .confirm(this.verificationCode)
    .then(result=>{
      this.user = result.user
    })
    .catch(err=>console.log('Incorrect code',err))
  }

}
 */
/* @Component({
  selector: 'app-phone-authenticate',
  templateUrl: './phone-authenticate.component.html',
  styleUrls: ['./phone-authenticate.component.css']
}) */
/* 
export class PhoneAuthenticateComponent implements OnInit {
  windowRef: any;
  phoneNumber;
  verificationCode: string;
  user: any;
  constructor(
    public router: Router,
    public activeRouter: ActivatedRoute,
    public msgService: MsgService,
    private win: WindowService,
    public firebaseAuth: AngularFireAuth,
  ) {
    this.phoneNumber = this.activeRouter.snapshot.params['phone'];
  }

  ngOnInit(): void {
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    this.windowRef.recaptchaVerifier.render();
  }
   sendCode(){
    const appVerifier = this.windowRef.recaptchaVerifier;
    const num = this.phoneNumber
    firebase.auth().signInWithPhoneNumber(num,appVerifier)
   .then(
    result=>{
      this.windowRef.confirmationResult = result;
    })
    .catch(
      err=>console.log(err)
    )

  }
  verifyLoginCode(){
    this.windowRef.confirmationResult
    .confirm(this.verificationCode)
    .then(result=>{
      this.user = result.user
    })
    .catch(err=>console.log('Incorrect code',err))
  }

} */

/* import { Component, OnInit } from '@angular/core';
import { WindowService } from './../../auth/service/window.service';
import firebase  from 'firebase/app'
import 'firebase/auth';

@Component({
  selector: 'app-phone-authenticate',
  templateUrl: './phone-authenticate.component.html',
  styleUrls: ['./phone-authenticate.component.css']
})
  export class PhoneAuthenticateComponent implements OnInit {
    windowRef: any;
    phoneNumber;
    verificationCode: string;
    user: any;
constructor(private win: WindowService) { }
    ngOnInit() {
      this.windowRef = this.win.windowRef
      this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
  
      this.windowRef.recaptchaVerifier.render()
    }
  
    sendLoginCode() {
  
      const appVerifier = this.windowRef.recaptchaVerifier;
  
      const num = this.phoneNumber.e164;
  
      firebase.auth().signInWithPhoneNumber(num, appVerifier)
              .then(result => {
  
                  this.windowRef.confirmationResult = result;
  
              })
              .catch( error => console.log(error) );
  
    }
  
    verifyLoginCode() {
      this.windowRef.confirmationResult
                    .confirm(this.verificationCode)
                    .then( result => {
  
                      this.user = result.user;
  
      })
      .catch( error => console.log(error, "Incorrect code entered?"));
    }
  
  
  } */