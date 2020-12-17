import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsgService } from 'src/app/shared/services/msg.service';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitting: boolean = false;
  user;
  constructor(
    public msgService: MsgService,
    public router: Router,
    public authService: AuthService
  ) {
    this.user = new User({});
  }

  ngOnInit(): void {
  }
  register() {
    this.submitting = true;
    this.authService.register(this.user)
      .subscribe(
        data => {
          console.log('data in register>>>', data);
          this.msgService.showSuccess('Register Successful');
          this.authService.emailVerifySend(data)
            .subscribe(
              data => {
                this.msgService.showInfo('To verify your email please check you email.')
              }, err => {
                this.msgService.showError(err);
              }
            )
          this.router.navigate(['/auth/login']);
        },
        err => {
          this.msgService.showError(err);
        }
      )
    this.submitting = false;
  }
}
