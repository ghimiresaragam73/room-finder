import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsgService } from 'src/app/shared/services/msg.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user;
  view: boolean = true;
  submitting: boolean = false;
  password: string;
  passwordChanged:boolean = false;
  constructor(
    public msgService: MsgService,
    public router: Router,
    public userService: UserService
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
  }

  edit() {
    this.submitting = true;
    this.userService.edit(this.user._id, this.user)
      .subscribe(
        (data: any) => {
          this.msgService.showSuccess("Edit Successful");
          console.log('....>>>>>>>', data)
          this.router.navigate(['/user/profile']);
        },
        err => {
          this.msgService.showError(err);
        }
      )
    this.viewChanged();
    this.submitting = false;
  }

  viewChanged() {
    this.view = !this.view;
  }
}
