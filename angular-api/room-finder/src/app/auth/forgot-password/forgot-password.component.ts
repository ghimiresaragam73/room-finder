import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsgService } from 'src/app/shared/services/msg.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  submitting: boolean = false;
  email: string;
  constructor(
    public msgService: MsgService,
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  submit() {
    this.submitting = true;
    this.authService.forgotPassword(this.email)
      .subscribe(
        data => {
          this.msgService.showInfo('Password reset link sent to your email. Link will expire in 24 hours.');
          this.submitting = false;
          this.router.navigate(['/auth/login']);
        },
        err => {
          this.msgService.showError(err);
          this.submitting = false;
        }
      )
  }

}
