import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsgService } from './services/msg.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';



@NgModule({
  declarations: [
    PageNotFoundComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavBarComponent
  ],
  providers: [
    MsgService
  ]
})
export class SharedModule { }
