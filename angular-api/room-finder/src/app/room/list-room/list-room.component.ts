import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsgService } from 'src/app/shared/services/msg.service';
import { environment } from 'src/environments/environment';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-list-room',
  templateUrl: './list-room.component.html',
  styleUrls: ['./list-room.component.css']
})
export class ListRoomComponent implements OnInit {
  rooms;
  loading: boolean = true;
  imageUrl: string;
  @Input() data;
  constructor(
    public msgService: MsgService,
    public roomService: RoomService,
    public router: Router
  ) {
    this.imageUrl = environment.roomImageUrl;
  }

  ngOnInit(): void {
    if (!this.data) {
      this.roomService.get()
        .subscribe(
          data => {
            this.rooms = data;
            this.loading = false;
          },
          err => {
            this.msgService.showError(err);
          }
        )
    } else {
      this.rooms = this.data;
      this.loading = false;
    }
  }

  removeRoom(id, i) {
    let removeConfirm = confirm("Are you sure to delete?");
    if (removeConfirm) {
      this.roomService.remove(id)
        .subscribe(
          data => {
            this.msgService.showSuccess('Room Removed');
            this.rooms.splice(i, 1);
          },
          err => {
            this.msgService.showError(err);
          }
        )
    }
  }
  isLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
  roomDashboard(id){
this.router.navigate(['/room/dashboard/'+id])
  }

}
