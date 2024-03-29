import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/cart/cart.service';
import { MsgService } from 'src/app/shared/services/msg.service';
import { environment } from 'src/environments/environment';
import { Room } from '../model/room.model';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-room-dashbord',
  templateUrl: './room-dashbord.component.html',
  styleUrls: ['./room-dashbord.component.css']
})
export class RoomDashbordComponent implements OnInit {
  
  room;
  data;
  id: string;
  loading: boolean = true;
  imageUrl;
  i: number = 0;
  j: number;
  isMapCheck: boolean = false;
  lat;
  lng;
  constructor(
    public msgService: MsgService,
    public router: Router,
    public activeRouter: ActivatedRoute,
    public roomService: RoomService,
    public cartService: CartService
  ) {
    this.id = this.activeRouter.snapshot.params["id"];
    this.imageUrl = environment.roomImageUrl
  }

  ngOnInit(): void {
    if (!this.room) {
      this.roomService.getById(this.id)
        .subscribe(
          (data: any) => {
            this.j = data.image.length;
            this.room = data;
            console.log('roomsss', this.room);
            if (this.room.map.isMap) {
              console.log('this.room.map', this.room.map)
              this.lat = this.room.map.lat;
              this.lng = this.room.map.lng;
              this.isMapCheck = true;
            }
            this.loading = false;
          },
          err => {
            this.msgService.showError(err)

          }
        )
      this.loading = false;
    }
  }


  right() {
    console.log('Right clicked');
    if (this.i < this.j || this.i >= 0) {
      this.i = this.i + 1;
    }
    if (this.i >= this.j)
      this.i = this.j - 1;



  }
  left() {
    console.log('Left Clicked');
    if (this.i >= 0 || this.i < this.j) {
      this.i = this.i - 1;
    }
    if (this.i <= 0)
      this.i = 0;

  }
  addToCart() {
    this.cartService.addToCart(this.id)
      .subscribe(
        data => {
          console.log('data', data);
          this.msgService.showSuccess('Added');
          
        },
        err => {
          this.msgService.showError(err)
        }
      )
  }
  edit(){
    this.router.navigate(['/room/edit/'+this.room._id])
  }
  removeRoom(_id, index) {
    let removeConfirm = confirm("Are you sure to delete?");
    if (removeConfirm) {
      this.roomService.remove(_id)
        .subscribe(
          data => {
            this.msgService.showSuccess('Room Removed');
            // this.room.splice(index, 1);
            this.router.navigate(['/room/list'])
          },
          err => {
            this.msgService.showError(err);
          }
        )
    }
  }

}

