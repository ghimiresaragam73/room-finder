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
  userImage;
  view: boolean = true;
  data;
  user;
  loading: boolean = true;
  filesToUpload = [];
  url;
  check: boolean = false;
  constructor(
    public msgService: MsgService,
    public router: Router,
    public userService: UserService,
    public uploadService: UploadService

  ) {
    this.url = environment.baseUrl + '/user';
    this.userImage = environment.userImageUrl;
  }

  ngOnInit(): void {
    if (!this.user) {
      this.data = JSON.parse(localStorage.getItem('user'));
      this.userService.getById(this.data._id)
        .subscribe(
          (data: any) => {
            this.user = data;
            if (data.image != undefined)
              this.check = true;
            this.loading = false;
          }
        )
      this.loading = false;
    } else {
      this.loading = false;
    }
  }

  edit() {
    this.uploadService.upload(this.user,this.filesToUpload,"PUT",this.url)
      .subscribe(
        (data:any) => {
          this.msgService.showSuccess('Edit Success');
          console.log('data>>>>>>>>>>', data);
          if(data.image!=undefined)
          this.check=true
          this.viewChanged();
        }, err => {
          this.msgService.showError('err aayo');
        }
      )
  }

  viewChanged() {
    this.view = !this.view;
this.router.navigate(['/user/profile/'+this.user._id])
  }

  fileChanged(ev) {
    this.filesToUpload = ev.target.files;
  }
}
