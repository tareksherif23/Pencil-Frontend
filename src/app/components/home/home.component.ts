import { Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import MediumEditor from 'medium-editor';
import { evaluate } from 'mathjs';
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
    this.latex(editor)
    this.fs.doc('users/'+this.userId).set({
    note: editor.getContent()
    })
});
   
}


private latex(editor: any): void {
 
  console.log("Hello from latex")
  const content = editor.getContent(0);

  //  some filtering
  if (content.lastIndexOf('$') <= content.indexOf('$') + 3) return;

  //  get a pure text version of the content
  const notag = new RegExp(/<[a-zA-Z\/][^>]*>/, 'igm');
  const noTagContent = content.replace(notag, '');

  let cursorPos = editor.exportSelection();

  //  find all strings between $ signs 
  let matches = content.match(/\$(.*?)\$/igm)
  
  //  evaluate arithmetic expressions
  let solutions: string[] = [];

  for (let i in matches) {
    let match = matches[i];
    match = match.replace(/\$/igm, '');
    match = match.replace(notag, '');

    try {
      match = (evaluate(match));
    } catch (e) {
      match = null;
    }
    solutions[i] = match;
  };

  //  if there is nothing to replace then return
  if (solutions.filter(x => !!x).length <= 0) return;

  //  replace expressions in the text with results
  //  formatting tags will be gone!
  solutions.forEach((solution, index) => {
    if (!solution) return;
    if(!matches) return;
    const matchNoTag = matches[index].replace(notag, '');
    editor.importSelection({
      start: noTagContent.lastIndexOf(matchNoTag),
      end: noTagContent.lastIndexOf(matchNoTag) + matchNoTag.length
    },true);
    editor.pasteHTML(solution);
    if (noTagContent.substr(cursorPos.end - 1, matches[index].length) !== matches[index]) {
      cursorPos.start -= matchNoTag.length - String(solution).length;
    } else {
      cursorPos.start--;
    }
    cursorPos.end = cursorPos.start;
  });

  //  move cursor back to where it was
  editor.importSelection(cursorPos, false);
} 


}
