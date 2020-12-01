import { Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import MediumEditor from 'medium-editor';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userId = '';
  isUser: boolean = false
  loaded = false
  @ViewChild('container')
  container!: ElementRef;
  

constructor(public auth: AngularFireAuth,public fs: AngularFirestore) { }

  ngOnInit() {
    this.auth.user.subscribe(user=>{
      if (user) this.isUser = true;
      else this.isUser = false})
  }

   ngAfterViewInit() {
    const element = this.container.nativeElement;
    const editor = new MediumEditor(element,{ toolbar: {
      allowMultiParagraphSelection: true,
      buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote'],
      diffLeft: 0,
      diffTop: -10,
      firstButtonClass: 'medium-editor-button-first',
      lastButtonClass: 'medium-editor-button-last',
      standardizeSelectionStart: false,
      static: false,
      align: 'center',
      sticky: false,
      updateOnEmptySelection: false
  }});
  

  this.auth.user.subscribe(user=>{
    if (user) this.isUser = true;
    else this.isUser = false})

  this.auth.authState.subscribe(user => {
    if(user) {this.userId = user.uid
      this.fs.doc('users/'+this.userId).valueChanges().subscribe(x =>{
        if(!this.loaded){
        editor.setContent((<any>x).note)
       this.loaded = true
      }
    })
  }
}) 
  
  editor.subscribe('editableInput', (event, editable)=>{
    this.fs.doc('users/'+this.userId).set({
    note: editor.getContent()
    })
});
   
}

}
