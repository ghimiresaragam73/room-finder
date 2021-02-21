import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app.routing';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';
import { MainModule } from './main/main.module';
import { CartModule } from './cart/cart.module';
// import {AgmCoreModule} from '@agm/core';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    AuthModule,
    UserModule,
    RoomModule,
    SharedModule,
    AppRoutingModule,
    MainModule,
    CartModule,
    // AgmCoreModule.forRoot({
    //   apiKey:'GOOGLE API KEY',
    //   libraries:['places']
    // }),
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
