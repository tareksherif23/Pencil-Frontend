import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

  constructor(public auth: AngularFireAuth) {
  }
  login() {
  var provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = (<any>result).credential.accessToken;
    var user = result.user;
    
    console.log(`USER =  ${user?.displayName}   Token = ${token} `)
  }).catch(function(error) {
    // Handle Errors here.
  
  });



  }
  logout() {
    this.auth.signOut();
  }

}