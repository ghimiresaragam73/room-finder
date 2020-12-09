import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AddRoomComponent } from './add-room/add-room.component';
import { EditRoomComponent } from './edit-room/edit-room.component';
import { ListRoomComponent } from './list-room/list-room.component';
import { SearchRoomComponent } from './search-room/search-room.component';

const roomRoute: Routes = [
    {
        path: 'add',
        component: AddRoomComponent
    }, {
        path: 'list',
        component: ListRoomComponent
    }, {
        path: 'search',
        component: SearchRoomComponent
    }, {
        path: 'edit/:id',
        component: EditRoomComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(roomRoute)
    ],
    exports: [
        RouterModule
    ]
})

export class RoomRoutingModule {

}