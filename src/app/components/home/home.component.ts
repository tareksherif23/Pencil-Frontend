import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NotesService } from 'src/app/services/notes.service';
import {Note} from 'src/app/interfaces/note.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  notes: Note[] = []
  isUser: boolean = false

  constructor(public auth: AngularFireAuth,private ns: NotesService) { }
  ngOnInit() {
    this.auth.user.subscribe(user=>{
      if (user) this.isUser = true;
      else this.isUser = false
     // this.ns.getAllNotes().subscribe(data => console.log(data) )
    })  
  }

}
