import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MsgService } from 'src/app/shared/services/msg.service';
import { environment } from 'src/environments/environment';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-dashboard',
  templateUrl: './cart-dashboard.component.html',
  styleUrls: ['./cart-dashboard.component.css', './../../app.component.css']
})
export class CartDashboardComponent implements OnInit {
  rooms;
  id: string;
  loading: boolean = true;
  imageUrl;

  constructor(
    public cartService: CartService,
    public msgService: MsgService,
    public router: Router,
    public activeRouter: ActivatedRoute
  ) {
    this.id = activeRouter.snapshot.params["id"]
    this.imageUrl = environment.roomImageUrl;

  }

  ngOnInit(): void {
    // for (let i = 1; i <= 1000; i++) {
      if (!this.rooms) {
        this.cartService.getAllCart()
          .subscribe(
            data => {
              console.log(data);
              this.rooms = data[0];
              this.loading = false;
            },
            err => {
              this.msgService.showError(err);
              this.loading = false
            }
          )

      }
    // }
  }

}
