import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsgService } from '../services/msg.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css', './../../app.component.css']
})
export class NavBarComponent implements OnInit {
  navBar: boolean = false;
  constructor(
    public msgService: MsgService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }
  isLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  toogle() {
    this.navBar = !this.navBar;
  }
  homeWent() {
    this.router.navigate(['/home'])
  }

  logOut() {
    this.msgService.showSuccess('Logout Success');
    localStorage.clear();
  }
  // cart(){
  //   this.router.navigate(['cart'])
  // }
}