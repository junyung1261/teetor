import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import firebase from 'firebase/app';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public afAuth: AngularFireAuth) { }

  signInUser(newEmail: string, newPassword: string): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }


  

  signUpUser(newEmail: string, newPassword: string, newName: string, newIsMentee: string ): firebase.Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword)
    .then( newUser => {
     
     firebase.database().ref('/users').child(newUser.uid)
    .set({ email: newEmail, 
           name: newName,
           isMentee: newIsMentee,
           profileImg: "assets/img/noavatar.png" })
   
  });
  }

  resetPassword(email: string): firebase.Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  signOutUser(): firebase.Promise<any> {
    return this.afAuth.auth.signOut();
  }

}
