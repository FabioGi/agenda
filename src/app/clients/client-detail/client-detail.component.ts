import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { FormsModule } from "@angular/forms";
import { AngularFireAuth } from 'angularfire2/auth';

import { ClientService } from './../shared/client.service';
import { AuthService } from '../../core/auth.service';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from 'angularfire2/firestore'; 
import { 	AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {

  client: Observable<any>;

  firstnameField = "firstname";
  lastnameField = "lastname";
  emailField = "email";
  phoneField = "phone";
  streetField = "street";
  zipField = "zip";
  cityField = "city";
  birthdateField = "birthdate";
  fichetechniqueField = "fichetechnique";


  // @Input() client: Client;

  constructor(
  	private clientService: ClientService,
  	private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public  auth : AuthService ,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private db: AngularFireDatabase,
  ) 
  {}

  ngOnInit() {
    this.client = this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.clientService.getClientWithKey(params.get('id')));
  }

  updateField(key,field,value,userId) {
    this.clientService.updateClient(key,field,value);
    this.updateUserData(userId,value,field);
  }

  goBack(): void {
  	this.location.back();
	}

  deleteClient(client):void {
    this.clientService.deleteClient(client);
  }

  goToCalendar(){
    this.router.navigate(['/calendar']);
  }

  private updateUserData(userId,value,field) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${userId}`
    );
    var data = {};
    data[`${field}`] = value;
    return userRef.set( data, { merge: true });
  }

  

}