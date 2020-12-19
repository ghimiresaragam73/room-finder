import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MsgService } from 'src/app/shared/services/msg.service';
import { UserService } from 'src/app/user/services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  id;
  loading: boolean = true;
  check: string;
  verify: boolean;
  constructor(
    public msgService: MsgService,
    public authService: AuthService,
    public router: Router,
    public activeRouter: ActivatedRoute
  ) {
    this.id = this.activeRouter.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.activeRouter.queryParams.subscribe(
      params => {
        this.check = params['verify']
      }
    )
    console.log('params', this.check);
    if (this.check == "true") {
      this.authService.emailVerify(this.id)
        .subscribe(
          data => {
            this.msgService.showSuccess('Email Verified');
            this.loading = false;
          }, err => {
            this.msgService.showError(err);
            this.loading = false;
          }
        )
      this.router.navigate(['/home']);
    }
    else {
      console.log('dukhi aatma')
      this.authService.remove(this.id)
        .subscribe(
          data => {
            this.msgService.showSuccess('Unsuscribed')
          }, err => {
            this.msgService.showError(err);
          }
        )
      this.router.navigate(['/home']);
    }

  }
}
