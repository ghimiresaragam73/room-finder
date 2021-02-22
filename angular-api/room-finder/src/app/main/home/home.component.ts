import { identifierModuleUrl } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
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
  address;
  blockAll: boolean = false
  loading: boolean = true;
  imgUrl: string;
  searching: boolean = false;
  searchedData;
  @Input() searchFromNav;
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
            this.normal = data[2]
            this.premium = data[0]
            this.urgent = data[1]
            console.log('data', data);
            this.rooms = data[0].concat(data[2].concat(data[1]))
            let length = this.rooms.length
            this.rooms = this.rooms.splice(4,length-8)
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

  search() {
    console.log('this.adress', this.address);
    this.msgService.showInfo('Button Clicked');
    let address = {
      address: this.address
    }
    this.roomService.search(address)
      .subscribe(
        data => {
          console.log(data);
          this.searching = !this.searching
          this.searchedData = data;
        }, err => {
          this.msgService.showError(err);
        }
      )
  }

  isLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  roomDashboard(id) {
    this.router.navigate(['/room/dashboard/' + id])
  }
}
