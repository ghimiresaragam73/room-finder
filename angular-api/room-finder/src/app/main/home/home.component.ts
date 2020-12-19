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
    if (!this.rooms) {
      this.roomService.get()
        .subscribe(
          data => {
            this.rooms = data;
          }, err => {
            this.msgService.showError(err);
          }
        )
      this.loading = false;
    }
  }
  onClick() {
    console.log('button clicked');
  }
}
