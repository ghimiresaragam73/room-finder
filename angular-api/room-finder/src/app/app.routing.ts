import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }, {
        path: 'home',
        component: HomeComponent
    }, {
        path: 'auth',
        loadChildren: './auth/auth.module#AuthModule'
    }, {
        path: 'user',
        loadChildren: './user/user.module#UserModule'
    }, {
        path: 'room',
        loadChildren: './room/room.module#RoomModule'
    }, {
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