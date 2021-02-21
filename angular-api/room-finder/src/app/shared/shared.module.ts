import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsgService } from './services/msg.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UploadService } from './services/upload.service';
import { LoaderComponent } from './loader/loader.component';
import { FooterComponent } from './footer/footer.component';
import{ExploreComponent} from './explore/explore.component';



@NgModule({
  declarations: [
    PageNotFoundComponent,
    NavBarComponent,
    LoaderComponent,
    FooterComponent,
    ExploreComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    NavBarComponent,
    LoaderComponent,
    FooterComponent,
  ],
  providers: [
    MsgService,
    UploadService
  ]
})
export class SharedModule { }
