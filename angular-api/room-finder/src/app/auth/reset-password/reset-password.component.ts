import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MsgService } from 'src/app/shared/services/msg.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  data;
  passwordValidate: boolean = false;
  constructor(
    public router: Router,
    public activeRouter: ActivatedRoute,
    public msgService: MsgService,
    public authService: AuthService
  ) {
    this.data = {
      password: '',
      confirmPassword: '',
      id: this.activeRouter.snapshot.params['id']
    }
  }

  ngOnInit(): void {
  }
  submit() {
    this.authService.resetPassword(this.data)
      .subscribe(
        data => {
          this.msgService.showSuccess("Password reset successful");
          this.router.navigate(['/auth/login']);
        },
        err => {
          this.msgService.showError(err);
        }
      )
  }

}
