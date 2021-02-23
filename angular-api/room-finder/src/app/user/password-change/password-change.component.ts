import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { MsgService } from 'src/app/shared/services/msg.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {
  datas: any;
  user: any;
  constructor(
    public msgService: MsgService,
    public router: Router,
    public userService: UserService
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.datas = {
      oldPassword: '',
      password: ''
    }
  }

  ngOnInit(): void {
  }
  edit() {
    this.userService.passwordChange(this.user._id, this.datas)
      .subscribe(
        data => {
          this.msgService.showSuccess('Password Change Success');
          this.router.navigate(['/user/profile'])
        },
        err => {
          this.msgService.showError(err);
        }
      )
  }

}
