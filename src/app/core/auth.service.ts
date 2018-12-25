import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// import { firebase } from '@firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from 'angularfire2/firestore'; 
import { 	AngularFireDatabase} from 'angularfire2/database';

// import { NotifyService } from './notify.service';

import { Observable, of } from 'rxjs';
import { switchMap, startWith, tap, filter } from 'rxjs/operators';
import * as firebase from 'firebase';
import 'rxjs/add/operator/map';

interface User {
  uid: string | null;
  email?: string | null;
  photoURL?: string;
  displayName?: string;
  role?:        string;
}

@Injectable()
export class AuthService {
  user: Observable<User | null>;
  private memberPath = '/members';
  usersCollection : AngularFirestoreCollection<any>;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private db: AngularFireDatabase,
   // private notify: NotifyService
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          if (user.uid) {
              return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        } else {
          return of(null);
        } 
      }),
      
      // tap(user => localStorage.setItem('user', JSON.stringify(user))),
      // startWith(JSON.parse(localStorage.getItem('user')))
    );
    // this.usersCollection     = this.afs.collection('users');
  }

  ////// OAuth Methods /////

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    console.log(provider);
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  twitterLogin() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: any) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(credential => {
        console.log('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(credential.user);
      })
      .catch(error => this.handleError(error));
  }

  //// Anonymous Auth ////

  anonymousLogin() {
    return this.afAuth.auth
      .signInAnonymously()
      .then(credential => {
        console.log('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(credential.user); // if using firestore
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  //// Email/Password Auth ////

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => {
        console.log('Welcome new user!', 'success');
        return this.updateUserData(credential.user); // if using firestore
      })
      .catch(error => this.handleError(error));
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        console.log('Welcome back!', 'success');
        return this.updateUserData(credential.user);
      })
      .catch(error => this.handleError(error));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth
      .sendPasswordResetEmail(email)
      .then(() =>  console.log('Password update email sent', 'info'))
      .catch(error => this.handleError(error));
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    console.log(error.message, 'error');
  }

  // Sets user data to firestore after succesful login
  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || 'nameless user',
      photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ',
      // role : 'public'
    };
    // console.log(user.role);
    return userRef.set(data, { merge: true });
  }

  // get Users
  getUsersList() {
    return this.afs.collection('users').snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(
        snap.payload.doc.data(),
        { $key: snap.payload.doc.id }) );
    });
  }
  // change role
  changeRole(user, value) {
    const batch   = this.afs.firestore.batch();
    const db      = firebase.firestore();
    const userKey = user.$key;
    console.log(value);
    const userRef        = db.collection('users').doc(userKey);
    batch.update(userRef, 'role', value);
    batch.commit().then(function() {console.log('Batch Commited')});
    if(user.memberkey){
      this.changeVisibility(user); 
    }
  }

  changeVisibility(user) {
    const memberKey = user.memberkey;
    const memberPath = `${this.memberPath}/${memberKey}/visible`;
    const updateField = {};
    updateField[memberPath]= true;
    this.db.object("/").update(updateField).then(_=>
      console.log('Data Updated in ' + memberPath)
   );
  }

}
