import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRoomComponent } from './add-room/add-room.component';
import { EditRoomComponent } from './edit-room/edit-room.component';
import { ListRoomComponent } from './list-room/list-room.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { SearchRoomComponent } from './search-room/search-room.component';
import { RoomRoutingModule } from './room.routing';
import { RoomService } from './service/room.service';



@NgModule({
  declarations: [
    AddRoomComponent,
    EditRoomComponent,
    ListRoomComponent,
    SearchRoomComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
    RoomRoutingModule
  ],
  providers:[RoomService]
})
export class RoomModule { }
