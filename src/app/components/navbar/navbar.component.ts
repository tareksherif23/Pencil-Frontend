import { Component, OnInit} from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

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

  logout(){
    this.auth.signOut().then(()=>
    this.router.navigate([''])).catch(
      function(error) {
    }); 
  
  
  }


}
