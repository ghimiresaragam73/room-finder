import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MsgService } from 'src/app/shared/services/msg.service';
import { environment } from 'src/environments/environment';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-room-dashbord',
  templateUrl: './room-dashbord.component.html',
  styleUrls: ['./room-dashbord.component.css']
})
export class RoomDashbordComponent implements OnInit {
  room;
  id: string;
  loading: boolean = true;
  imageUrl;
  constructor(
    public msgService: MsgService,
    public router: Router,
    public activeRouter: ActivatedRoute,
    public roomService: RoomService
  ) {
    this.id = this.activeRouter.snapshot.params["id"];
    this.imageUrl = environment.roomImageUrl;
  }

  ngOnInit(): void {
    if (!this.room) {
      this.roomService.getById(this.id)
        .subscribe(
          data => {
            this.room = data;
          },
          err => {
            this.msgService.showError(err)
          }
        )
      this.loading = false;
    }
  }

}
