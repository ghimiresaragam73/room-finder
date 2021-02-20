import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartDashboardComponent } from './cart-dashboard/cart-dashboard.component';
import { CartService } from './cart.service';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import{CartRoutingModule} from './cart.routing'



@NgModule({
  declarations: [CartDashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    CartRoutingModule
  ],
  exports:[
    CartDashboardComponent
  ],
  providers:[CartService]
})
export class CartModule { }
