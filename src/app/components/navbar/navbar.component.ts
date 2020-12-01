import { Component, OnInit} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isOpen: boolean = false
  isUser: boolean = false

  constructor(public auth: AngularFireAuth,public router: Router) { }
  ngOnInit() {
    
    this.auth.user.subscribe(user=>{
      if (user) this.isUser = true;
      else this.isUser = false
    })
  }

  toggleNavbar(){
    this.isOpen = !this.isOpen;

  }

  login() {
    var provider = new firebase.auth.GoogleAuthProvider()
    this.auth.signInWithPopup(provider).then(()=> {
      this.router.navigate(['home'])}).catch(function(error) {
      });
    }

  logout(){
    this.auth.signOut().then(()=>
    this.router.navigate([''])).catch(
      function(error) {
    });  
  }




}
