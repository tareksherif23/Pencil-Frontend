import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private fs: AngularFirestore) {   }

  addNewUser(uid: string,name: string){
 // console.log("Hellooo"+name+uid
  

  }
  
  updateNote(uid: string)
  {

  }

  retNote(uid: string)
  {
   // this.fs.collection()
  }

}
