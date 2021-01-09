import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  url;
  constructor(
    public msgService: MsgService,
    public router: Router,
    public authService: AuthService,
    public activeRouter: ActivatedRoute,
  ) {
    this.user = new User({});
  }

  ngOnInit(): void {
    this.url = this.activeRouter.snapshot.url /* (
      params => {
        this.url = params
      }
    ) */
    console.log('paramsss...', this.url);
  }
  register() {
    this.submitting = true;
    this.authService.register(this.user)
      .subscribe(
        (data:any) => {
          this.msgService.showSuccess('Register Successful');
          
          this.authService.emailVerifySend(data)
            .subscribe(
              data => {
                this.msgService.showInfo('To verify your email please check you email.')
              }, err => {
                this.msgService.showError(err);
              }
            )
            this.router.navigate(['/auth/login'])
        },
        err => {
          this.msgService.showError(err);
        }
      )
    this.submitting = false;
  }
}
