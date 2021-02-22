import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from 'src/app/room/services/room.service';
import { environment } from 'src/environments/environment';
import { MsgService } from '../services/msg.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css', './../../app.component.css']
})
export class NavBarComponent implements OnInit {
  navBar: boolean = false;
  address;
  searching: boolean = false;
  searchedData = [];
  imgUrl;
  constructor(
    public msgService: MsgService,
    public router: Router,
    public roomService: RoomService
  ) {
    this.imgUrl = environment.roomImageUrl;
  }

  ngOnInit(): void {
  }
  isLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  search() {
    console.log('this.adress???', this.address);
    this.msgService.showInfo('Button Clicked');
  }

  roomDashboard(id) {
    this.router.navigate(['/room/dashboard/' + id]);
    this.searching = false;
  }



  toogle() {
    this.navBar = !this.navBar;
    this.searching = false;
  }
  homeWent() {
    this.router.navigate(['/home'])
    this.searching = false;
  }

  logOut() {
    this.msgService.showSuccess('Logout Success');
    localStorage.clear();
  }
  // cart(){
  //   this.router.navigate(['cart'])
  // }
}