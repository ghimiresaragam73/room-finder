import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import{ CartDashboardComponent} from './cart-dashboard/cart-dashboard.component'
const cartRoutes: Routes=[
    {
        path :'',
        component:CartDashboardComponent
    }
]

@NgModule({
    imports:[RouterModule.forChild(cartRoutes)],
    exports:[RouterModule]

})
export class CartRoutingModule {}