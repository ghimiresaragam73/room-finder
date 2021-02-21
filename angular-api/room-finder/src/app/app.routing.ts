import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartDashboardComponent } from './cart/cart-dashboard/cart-dashboard.component';
import { ExploreComponent } from './shared/explore/explore.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }, {
        path: 'home',
        loadChildren: './main/main.module#MainModule'
    }, {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule'
    }, {
        path: 'user',
        loadChildren: './user/user.module#UserModule'
    }, {
        path: 'room',
        loadChildren: './room/room.module#RoomModule'
    },
    {
        path: 'cart',
        loadChildren:'./cart/cart.module#CartModule'
    },
    {
        path:'explore',
        component: ExploreComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}