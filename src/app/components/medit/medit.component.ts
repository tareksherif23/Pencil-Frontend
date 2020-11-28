import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import MediumEditor from 'medium-editor';

@Component({
  selector: 'medit',
  templateUrl: './medit.component.html',
  styleUrls: ['./medit.component.css']
})

export class MeditComponent {
  name = 'Angular';
  @ViewChild('container')
  container!: ElementRef;

  ngAfterViewInit() {
    const element = this.container.nativeElement;
    const editor = new MediumEditor(element,{ toolbar: {
      allowMultiParagraphSelection: true,
      buttons: ['italic', 'underline', 'anchor', 'h2', 'h3', 'quote'],
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
  }

 }



