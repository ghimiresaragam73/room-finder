import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AddRoomComponent } from './add-room/add-room.component';
import { ListRoomComponent } from './list-room/list-room.component';
import { SearchRoomComponent } from './search-room/search-room.component';
import { UpdateRoomComponent } from './update-room/update-room.component';

const roomRoutes: Routes = [
    {
        path: 'add',
        component: AddRoomComponent
    }, {
        path: 'update/:id',
        component: UpdateRoomComponent
    }, {
        path: 'list',
        component: ListRoomComponent
    }, {
        path: 'search',
        component: SearchRoomComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(roomRoutes)],
    exports: [RouterModule]
})

export class RoomRoutingModule {

}