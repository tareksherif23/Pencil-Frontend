import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private fs: AngularFirestore, private auth: AngularFireAuth) { }

  getAllNotes(){
    return this.fs.collection('notes').valueChanges()
    }

  updateNote(uid: string,note: string){

  }

  retNote(uid:string)
  {
    
  }

}
