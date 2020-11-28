import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  isUser: boolean = false

  constructor(public auth: AngularFireAuth) { }
  ngOnInit() {
    
    this.auth.user.subscribe(user=>{
      if (user) this.isUser = true;
      else this.isUser = false
    })
  }

}
