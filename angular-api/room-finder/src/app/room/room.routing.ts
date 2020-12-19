import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AddRoomComponent } from './add-room/add-room.component';
import { ListRoomComponent } from './list-room/list-room.component';
import { RoomDashbordComponent } from "./room-dashbord/room-dashbord.component";
import { SearchRoomComponent } from './search-room/search-room.component';
import { UpdateRoomComponent } from './update-room/update-room.component';

const roomRoutes: Routes = [
    {
        path: 'add',
        component: AddRoomComponent
    }, {
        path: 'edit/:id',
        component: UpdateRoomComponent
    }, {
        path: 'list',
        component: ListRoomComponent
    }, {
        path: 'search',
        component: SearchRoomComponent
    },
    {
        path: 'dashboard/:id',
        component: RoomDashbordComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(roomRoutes)],
    exports: [RouterModule]
})

export class RoomRoutingModule {

}