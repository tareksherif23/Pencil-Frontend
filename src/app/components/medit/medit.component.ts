import { Component, ViewChild, ElementRef} from '@angular/core';
import MediumEditor from 'medium-editor';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'medit',
  templateUrl: './medit.component.html',
  styleUrls: ['./medit.component.css']
})

export class MeditComponent {
  userId = '';
  loaded = false
  @ViewChild('container')
  container!: ElementRef;
  
  constructor(public auth: AngularFireAuth, public fs: AngularFirestore) {
  }

  ngAfterViewInit() {
    const element = this.container.nativeElement;
    const editor = new MediumEditor(element,{ toolbar: {
      /* These are the default options for the toolbar,
         if nothing is passed this is what is used */
      allowMultiParagraphSelection: true,
      buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote'],
      diffLeft: 0,
      diffTop: -10,
      firstButtonClass: 'medium-editor-button-first',
      lastButtonClass: 'medium-editor-button-last',
     // relativeContainer: null,
      standardizeSelectionStart: false,
      static: false,
      /* options which only apply when static is true */
      align: 'center',
      sticky: false,
      updateOnEmptySelection: false
  }});
  
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



