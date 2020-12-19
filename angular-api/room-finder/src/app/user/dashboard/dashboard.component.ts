import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user;
  constructor(
    public router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));

  }
  isLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
  }

}
