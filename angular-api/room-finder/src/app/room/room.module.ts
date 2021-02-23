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
import { RoomDashbordComponent } from './room-dashbord/room-dashbord.component';
import{NgxPaginationModule} from 'ngx-pagination'

import {AgmCoreModule} from '@agm/core'




@NgModule({
  declarations: [
    AddRoomComponent,
    ListRoomComponent,
    SearchRoomComponent,
    UpdateRoomComponent,
    RoomDashbordComponent,
  ],
  imports: [
    CommonModule,
    RoomRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyB1D7uemCFxNqfP0Z3ISpcGrxT3TdzK70k',
    },
    NgxPaginationModule
  ],
  providers: [RoomService]
})
export class RoomModule {

}
