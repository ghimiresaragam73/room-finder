import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MsgService } from 'src/app/shared/services/msg.service';
import { UploadService } from 'src/app/shared/services/upload.service';
import { environment } from 'src/environments/environment';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-update-room',
  templateUrl: './update-room.component.html',
  styleUrls: ['./update-room.component.css', './../add-room/add-room.component.css']
})
export class UpdateRoomComponent implements OnInit {
  id;
  room;
  carParking: boolean = false;
  bikeParking: boolean = false;
  loading: boolean = true;
  filesToUpload = [];
  url: string;
  constructor(
    public msgService: MsgService,
    public router: Router,
    public roomService: RoomService,
    public activeRouter: ActivatedRoute,
    public uploadService: UploadService
  ) {
    this.id = this.activeRouter.snapshot.params['id'];
    this.url = environment.baseUrl + '/room'
  }
  ngOnInit(): void {
    if (!this.room) {
      this.roomService.getById(this.id)
        .subscribe(
          data => {
            this.room = data;
            // console.log('room...', this.room);
            this.loading = false;
          }, err => {
            this.msgService.showError(err);
          }
        )

    }
  }

  submit() {
    this.room.carParking = this.carParking;
    this.room.bikeParking = this.bikeParking;
    console.log('this.roomm', this.room);
    console.log('this.filestoupload', this.filesToUpload);
    let httpVerb = 'PUT'
    this.roomService.upload(this.room, this.filesToUpload, httpVerb, this.url)
      .subscribe(
        data => {
          console.log('dataaaa k ayyou', data)
          this.msgService.showSuccess('Updated Success');
          this.router.navigate(['/room/list'])
        }, err => {
          this.msgService.showError(err);
        }
      )
  }

  fileChanged(ev) {
    this.filesToUpload = ev.target.files;
  }
  carParkingChanged() {
    this.carParking = !this.carParking;
  }
  bikeParkingChanged() {
    this.bikeParking = !this.bikeParking;
  }


}
