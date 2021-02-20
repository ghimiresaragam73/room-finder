import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsgService } from 'src/app/shared/services/msg.service';
import { UploadService } from 'src/app/shared/services/upload.service';
import { environment } from 'src/environments/environment';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user;
  view: boolean = true;
  url: string;
  userUrl: string;
  filesToUpload = [];
  check: boolean = false;
data;
  submitting: boolean = false;
  loading:boolean=true;
  password: string;
  passwordChanged: boolean = false;
  constructor(
    public msgService: MsgService,
    public router: Router,
    public userService: UserService,
    public uploadSerice: UploadService

  ) {
    this.data = JSON.parse(localStorage.getItem('user'));
    if (this.data.image != undefined) {
      this.check = true;
    }
    this.url = environment.baseUrl + '/user';
    this.userUrl = environment.userImageUrl;
  }

  ngOnInit(): void {
    if(!this.user){
      this.userService.getById(this.data._id)
      .subscribe(
        data=>{
          this.user = data;
          this.loading = false
        },
        err=>{
          this.msgService.showError(err);
        }
      )
    }else{
      this.user = this.data;
      this.loading= false;
    }
  }

  edit() {
    this.submitting = true;
    this.uploadSerice.upload(this.user, this.filesToUpload, "PUT", this.url)
      // this.userService.edit(this.user._id, this.user)

      // this.uploadService.upload(this.user, this.filesToUpload, "POST", this.url)

      .subscribe(
        (data: any) => {
          this.msgService.showSuccess("Edit Successful");
          console.log('....>>>>>>>', data)
          localStorage.removeItem('user');
          localStorage.setItem('user', JSON.stringify(data))
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
