import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './ui/angularmaterial.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './ui/not-found.component';



import { FlexLayoutModule } from '@angular/flex-layout';

import { AdminModule } from './admin/shared/admin.module';

///// Start Firebase

///// Special Modules
import { ClientModule } from './clients/shared/client.module';
import { MemberModule } from './members/shared/member.module';
import { PrestationModule } from './prestations/shared/prestation.module';
import { ProductsModule } from './products/shared/products.module';
import { ForfaitModule } from './forfaits/shared/forfait.module';
import { EventModule } from './events/shared/event.module';
import { CartModule } from './cart/shared/cart.module';
import { FacturationModule } from './facturation/shared/facturation.module';

// Core & Shared
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

// Feature Modules
import { UiModule } from './ui/shared/ui.module';

// Firebase
import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

// Environment
import { environment } from '../environments/environment';
import { EmailComponent } from './email/email.component';
// import { UsersComponent } from './users/users.component';
// import { environment } from '../environments/environment.prod';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    EmailComponent
  ],
  imports: [
    BrowserModule,
   // InfiniteScrollModule,
    CommonModule,
    HttpModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    UiModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FlexLayoutModule,
    AdminModule,
    ClientModule,
    MemberModule,
    PrestationModule,
    ProductsModule,
    ForfaitModule,
    EventModule,
    CartModule,
    FacturationModule,
  ],
  bootstrap: [
    AppComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }