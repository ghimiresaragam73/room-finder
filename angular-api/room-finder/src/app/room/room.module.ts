import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRoomComponent } from './add-room/add-room.component';
import { ListRoomComponent } from './list-room/list-room.component';
import { SearchRoomComponent } from './search-room/search-room.component';
import { UpdateRoomComponent } from './update-room/update-room.component';
import { RoomRoutingModule } from './room.routing';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RoomService } from './services/room.service';



@NgModule({
  declarations: [
    AddRoomComponent,
    ListRoomComponent,
    SearchRoomComponent,
    UpdateRoomComponent
  ],
  imports: [
    CommonModule,
    RoomRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [RoomService]
})
export class RoomModule {

}
