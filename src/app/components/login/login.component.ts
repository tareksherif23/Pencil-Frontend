import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import {UsersService} from 'src/app/services/users.service'
import {NotesService} from 'src/app/services/notes.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

  constructor(public auth: AngularFireAuth,public router: Router,private us: UsersService,private ns: NotesService ) {
  }


  login() {
  var provider = new firebase.auth.GoogleAuthProvider()
  this.auth.signInWithPopup(provider).then((result)=> {
    // This gives you a Google Access Token. You can use it to access the Google API.
    if(result.additionalUserInfo?.isNewUser)
    {
     this.us.addNewUser((<any>result).user.uid,(<any>result).user.displayName)
    }
    else{
    this.ns.retNote((<any>result).user.uid)
    }
   // var token = (<any>result).credential.accessToken;
   // console.log(`USER =  ${(<any>result).user.displayName}   UID = ${(<any>result).user.uid} `)
  }).then(()=>{
    this.router.navigate(['home'])}).catch(function(error) {
  });

  
  }
  

}