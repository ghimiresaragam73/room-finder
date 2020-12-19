import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { UserRoutingModule } from './user.routing';
import { SharedModule } from '../shared/shared.module';
import { UserService } from './services/user.service';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { RemoveComponent } from './remove/remove.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    PasswordChangeComponent,
    RemoveComponent],
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    SharedModule
  ],
  providers: [UserService]
})
export class UserModule { }
