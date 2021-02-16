import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsgService } from 'src/app/shared/services/msg.service';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user;
  submitting: boolean = false;
  rememberMe: boolean = false;
  constructor(
    public router: Router,
    public authService: AuthService,
    public msgService: MsgService
  ) {
    this.user = new User({});
  }

  ngOnInit(): void {
  }
  login() {
    this.submitting = true;
    this.authService.login(this.user)
      .subscribe(
        (data: any) => {
          console.log('dataaaa>', data);
          this.msgService.showSuccess('Login Successful');
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          if (this.rememberMe) {
            localStorage.setItem('remember', 'true');
          }
          /* Check for role condition (data.role ma  aauxa) */
          this.router.navigate(['/home']);
        },
        err => {
          this.msgService.showError(err);
        }
      )
    this.submitting = false;
  }

  rememberMeChanged() {
    this.rememberMe = !this.rememberMe;
  }

}
