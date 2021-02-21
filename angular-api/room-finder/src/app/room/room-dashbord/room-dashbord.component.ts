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
 testing
          (data: Room) => {
            this.j = data.image.length;

     (data: any) => {

            this.room = data;
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


  hoverImage() {

    let thumbnails = document.getElementsByClassName('thumbnails')
    let activeImages = document.getElementsByClassName('active')
    for (var i = 0; i < thumbnails.length; i++) {
      thumbnails[i].addEventListener('mouseover', function () {
        if ('activeImages > 0') {
          activeImages[0].classList.remove('active')
        }
        this.classList.add('active')
        document.getElementById('featured').id = this.id
      })


    }

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
        },
        err => {
          this.msgService.showError(err)
        }
      )
  }

  /* 
   */
}

