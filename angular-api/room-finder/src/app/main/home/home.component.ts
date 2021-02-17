import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from 'src/app/room/services/room.service';
import { MsgService } from 'src/app/shared/services/msg.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './../../app.component.css']
})
export class HomeComponent implements OnInit {
  premium;
  urgent;
  normal;
  rooms;
  loading: boolean = true;
  imgUrl: string;
  constructor(
    public roomService: RoomService,
    public router: Router,
    public msgService: MsgService
  ) {
    this.imgUrl = environment.roomImageUrl;
  }

  ngOnInit(): void {
    if (!this.premium) {
      this.roomService.getByCategories()
        .subscribe(
          data => {
            this.normal = data[0]
            this.premium = data[1]
            this.urgent = data[2]
            console.log('data',data);
            this.rooms = data[0].concat(data[2].concat(data[1]))
            console.log('yaha>>>>>>', this.rooms);
            /* console.log('data here', this.category); */
          }, err => {
            this.msgService.showError(err);
          }
        )
      this.loading = false;
    }
  }
  onClick(id) {
    console.log('button clicked');
    this.router.navigate(['/room/dashboard/' + id]);

  }
  /* Nav bar ma role check garney tarika */
  /* isRenter(){
    var user = localStorage.getItem('user');
    if(user.role==="renter"){
      return true;
    }else{
      return false;
    }
  } */

  isLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
}
