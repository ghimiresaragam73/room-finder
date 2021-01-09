import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MsgService } from "src/app/shared/services/msg.service";
import { Room } from "../model/room.model";
import { RoomService } from "../services/room.service";

@Component({
  selector: 'app-search-room',
  templateUrl: './search-room.component.html',
  styleUrls: ['./search-room.component.css']
})

export class SearchRoomComponent implements OnInit {
  room;
  submitting: boolean = false;
  allRooms = [];
  locations = [];
  result: boolean = false;
  searchResult = [];
  constructor(
    public msgService: MsgService,
    public roomService: RoomService,
    public router: Router
  ) {
    this.room = new Room({});
  }
  ngOnInit(): void {
    this.roomService.get()
      .subscribe(
        (data: any) => {
          this.allRooms = data;
          data.forEach((item, i) => {
            if (this.locations.indexOf(item.address) == -1) {
              this.locations.push(item.address);
            }
          })
        },
        err => {
          this.msgService.showError(err);
        }
      )
  }

  search() {
    this.submitting = true;
    this.roomService.search(this.room)
      .subscribe(
        (data: any) => {
          this.result = true;
          this.searchResult = data;
          this.submitting = false;
        }, err => {
          this.msgService.showError(err);
          this.submitting = false;
        }
      )
  }
  searchAgain() {
    this.result = false;
  }
}