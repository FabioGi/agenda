// tslint:disable-next-line:max-line-length
import { FirstConnectionPageComponent,ClientDialogComponent,MemberDialogComponent,OpenComponent } from './../first-connection-page/first-connection-page.component';
import { PageManagementComponent } from './../page-management/page-management.component';
import { UserAllComponent } from './../user-all/user-all.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '../angularmaterial.module';

import { NavService } from './nav.service';

import { UserLoginComponent } from '../user-login/user-login.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { TopNavComponent } from '../top-nav/top-nav.component';
import { DashboardComponent } from '../dashboard/dashboard.component';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    AngularMaterialModule
  ],
  declarations: [
    UserLoginComponent,
    UserProfileComponent,
    TopNavComponent,
    UserFormComponent,
    DashboardComponent,
    UserAllComponent,
    PageManagementComponent,
    FirstConnectionPageComponent,
    ClientDialogComponent,
    MemberDialogComponent,
    OpenComponent
  ],
  exports: [
    UserLoginComponent,
    TopNavComponent,
    UserProfileComponent,
    DashboardComponent
  ],
  entryComponents: [ ClientDialogComponent, MemberDialogComponent, OpenComponent ]
})
export class UiModule { }
