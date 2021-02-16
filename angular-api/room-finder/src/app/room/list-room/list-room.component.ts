import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  fetchPremium: boolean = false;
  fetchUrgent: boolean = false;
  fetchNormal: boolean = false;
  fetchAll: boolean = true;
  loading: boolean = true;
  imageUrl: string;
  @Input() data;
  constructor(
    public msgService: MsgService,
    public roomService: RoomService,
    public router: Router,
    public activeRouter: ActivatedRoute
  ) {
    this.imageUrl = environment.roomImageUrl;
    activeRouter.queryParams.subscribe(
      params => {
        if (params['premium'])
          this.fetchPremium = true;
        if (params['urgent'])
          this.fetchUrgent = true;
        if (params['normal'])
          this.fetchNormal = true
        if (this.fetchNormal || this.fetchPremium || this.fetchUrgent)
          this.fetchAll = false
      }
    )
  }

  ngOnInit(): void {
    if (!this.data) {
      if (this.fetchAll) {
        this.roomService.get()
          .subscribe(
            data => {
              console.log(this.fetchPremium, this.fetchUrgent, this.fetchNormal, this.fetchAll);
              this.rooms = data;
              console.log(data);
              this.loading = false;
            },
            err => {
              this.msgService.showError(err);
            }
          )
      } else {
        this.roomService.getByCategories()
          .subscribe(
            data => {
              console.log('yaha')
              if (this.fetchNormal) {
                this.rooms = data[0];
                console.log('yaha normal')
              }

              if (this.fetchPremium) {
                this.rooms = data[1];
                console.log('yaha premium')
              }

              if (this.fetchUrgent) {
                this.rooms = data[2];
                console.log('yaha urgent')
              }
              this.loading = false;
            },
            err => {
              this.msgService.showError(err);
            }
          )
      }
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
  roomDashboard(id) {
    this.router.navigate(['/room/dashboard/' + id])
  }

}
