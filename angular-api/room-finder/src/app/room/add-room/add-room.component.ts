import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsgService } from 'src/app/shared/services/msg.service';
import { UploadService } from 'src/app/shared/services/upload.service';
import { environment } from 'src/environments/environment';
import { Room } from '../model/room.model';
import { RoomService } from '../services/room.service';
import { MouseEvent } from '@agm/core'

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {
  submitting: boolean = false;
  room;
  filesToUpload = [];
  url: string;
  parking: any;
  mapChecking: boolean = false;
  lat: number;
  lng: number;
  isMap: boolean = false;
  mapChange: boolean = false;
  data: any = {};
  addedRoom: any;
  constructor(
    public router: Router,
    public msgService: MsgService,
    public roomService: RoomService,
    public uploadService: UploadService
  ) {
    this.room = new Room({});
    this.url = environment.baseUrl + '/room';
    this.parking = {
      car: false,
      bike: false
    }
  }

  ngOnInit(): void {
    
  }

  submit() {
    this.submitting = true;
    this.room.carParking = this.parking.car;
    this.room.bikeParking = this.parking.bike;
    this.uploadService.upload(this.room, this.filesToUpload, "POST", this.url)
      .subscribe(
        (data: any) => {
          this.msgService.showSuccess('Room Added Successfully');
          this.mapChecking = confirm("Do you want to add your location through maps");
          this.addedRoom = JSON.parse(data);
          setTimeout(function () { console.log('aayo ki nai') }, 1000);
          this.isMap = this.mapChecking

        },
        err => {
          this.submitting = false;
          this.msgService.showError(err);
        }
      )
  }
  fileChanged(ev) {
    this.filesToUpload = ev.target.files;
  }

  carParkingChanged() {
    this.parking.car = !this.parking.car;
  }

  bikeParkingChanged() {
    this.parking.bike = !this.parking.bike;
  }

  addMap() {
    this.mapChecking = !this.mapChecking;

  }

  mapClicked($event: MouseEvent) {
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
  }
  mapSubmit() {
    this.data.lat = this.lat;
    this.data.lng = this.lng;
    this.data.isMap = this.isMap;
    console.log('hahahahaha', this.addedRoom);
    this.roomService.edit(this.addedRoom._id, this.data)
      .subscribe(
        data => {
          this.msgService.showSuccess('Success');
          this.router.navigate(['/room/list']);
        }
      )
  }
}
