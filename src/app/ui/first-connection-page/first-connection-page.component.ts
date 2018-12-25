import { AuthService } from './../../core/auth.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from 'angularfire2/firestore'; 
import { ActiveDescendantKeyManager } from '../../../../node_modules/@angular/cdk/a11y';
import { MemberService } from '../../members/shared/member.service';


const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-first-connection-page',
  templateUrl: './first-connection-page.component.html',
  styleUrls: ['./first-connection-page.component.scss']
})

export class FirstConnectionPageComponent  {
  
  constructor(
    public auth: AuthService,
    private router: Router,
    public dialog: MatDialog) { 

  }

  openClientDialog(): void {
    const dialogRef = this.dialog.open(ClientDialogComponent, {
      width: '600px',
      height: '600px'
     // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     // this.animal = result;
    });
  }

  openMemberDialog(): void {
    const dialogRef = this.dialog.open(MemberDialogComponent, {
      width: '550px',
      height: '550px'
     // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     // this.animal = result;
    });
  }

}

@Component({
  selector: 'app-client-dialog', 
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.scss']
})
export class ClientDialogComponent {

  private clientsRef: AngularFireList<any>;
  clients: Observable<any[]>;
  m:string;

  constructor(
    public dialogRef: MatDialogRef<ClientDialogComponent>,
    public auth:AuthService,
    private db: AngularFireDatabase,
    private afs: AngularFirestore,
    private router: Router, 
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.clientsRef = db.list('clientes');
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

    // tslint:disable-next-line:member-ordering
    emailFormControl = new FormControl('', [ Validators.required,  Validators.pattern(EMAIL_REGEX)]);
    
    emptyField(n: string) {
      if (!n) { this.m = ''; } else if (n === '') { this.m = ''; } else { this.m = n; }
      return this.m;
    }

    onSubmit(newClientForm: NgForm, userId , userEmail) {
      // console.log(newClientForm.valid);  // false
      var newRef = this.clientsRef.push({
        timestamp: Date.now(),
        firstname: 			this.emptyField(newClientForm.value.newClientfirstname),
        lastname: 			this.emptyField(newClientForm.value.newClientlastname),
        birthdate: 			this.emptyField(newClientForm.value.newClientbirthdate),
        email: 					userEmail,
        phone: 					this.emptyField(newClientForm.value.newClientphone),
        street: 				this.emptyField(newClientForm.value.newClientstreet),
        zip: 						this.emptyField(newClientForm.value.newClientzip),
        city: 					this.emptyField(newClientForm.value.newClientcity),
        fichetechnique: this.emptyField(newClientForm.value.newClientfichetechnique)
      }).key;
      this.router.navigate(['/calendar']);
      this.updateUserData(newClientForm, userId , userEmail,newRef);
      console.log(newClientForm.value, userId , userEmail);
      console.log(newRef); 
    }

    private updateUserData(newClientForm: NgForm, userId , userEmail,newRef) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(
        `users/${userId}`
      );
  
      const data: any = {
        clientkey : newRef,
        timestamp: Date.now(),
        firstname: 			this.emptyField(newClientForm.value.newClientfirstname),
        lastname: 			this.emptyField(newClientForm.value.newClientlastname),
        birthdate: 			this.emptyField(newClientForm.value.newClientbirthdate),
        email: 					userEmail,
        phone: 					this.emptyField(newClientForm.value.newClientphone), 
        city: 					this.emptyField(newClientForm.value.newClientcity),
        role: 'public' 
       // fichetechnique: this.emptyField(newClientForm.value.newClientfichetechnique)
      };
      return userRef.set(data, { merge: true });
    }
}


@Component({
  selector: 'app-member-dialog',
  templateUrl: './member-dialog.component.html',
  styleUrls: ['./member-dialog.component.scss'] 
})
export class MemberDialogComponent {
  m: any;
  pickedMemberRole: string;
  roles: any;
  memberkey : any ;
  firstname: any;
  lastname: any;
  roleKey: any;

  emptyField(n: string) {
    if (!n) { this.m = ''; } else if (n === '') { this.m = ''; } else { this.m = n; }
    return this.m;
  }

 // roles = [{key: 2, title: 'manager'}, {key:2, title: 'Coiffeur'}, {key:4 , title: 'Manicure'}, {key:5 , title: 'Hotesse'}];
  constructor(
    public dialogRef: MatDialogRef<MemberDialogComponent>,
    public memberService : MemberService,
    private afs: AngularFirestore,
    public auth: AuthService, 
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.roles = this.memberService.getRoles();
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private updateUserRole(userId, memberkey, firstname, lastname , rolekey ) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${userId}`
    );
  
    const data: any = {
     role: 'agent-waiting',
     memberkey: memberkey,
     firstname: firstname,
     lastname : lastname,
     rolekey  : rolekey,
     salonkey : '1'
    };
    return userRef.set(data, { merge: true });
  }

  openModal(): void {
    const dialogRef = this.dialog.open(OpenComponent, {
      width: '400px',
      height: '200px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onSubmit(newMemberForm: NgForm, userId) {
    this.memberkey = this.memberService.createMember(newMemberForm, false);
    this.firstname = this.emptyField(newMemberForm.value.newMemberfirstname);
    this.lastname = this.emptyField(newMemberForm.value.newMemberlastname);
    this.roleKey = newMemberForm.value.pickedMemberRole.$key;
    this.updateUserRole(userId, this.memberkey,this.firstname,this.lastname,this.roleKey);   
    this.onNoClick(); 
  }
}

@Component({
  selector: 'app-open',
  templateUrl: './open.component.html',
  styleUrls: ['./open.component.scss'] 
})
export class OpenComponent {

  constructor(
    public dialogRef: MatDialogRef<OpenComponent>,
    public auth: AuthService,  
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  logout() {
    this.auth.signOut();
    this.onNoClick();
  }
}
