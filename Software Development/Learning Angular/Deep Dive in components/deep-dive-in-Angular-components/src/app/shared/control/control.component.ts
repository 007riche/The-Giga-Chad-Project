import { Component, ElementRef, ContentChild, HostBinding, HostListener, inject, input, contentChild, ViewEncapsulation, AfterViewInit, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None, // Manipulating the scope of the style files linked to the component
  host: {

  // property binding
  class: 'control',

  // Event binding
  '(click)': 'onClick()'

   }, // manipulating the properties of the host element (here, in the dom, 
  // all the app-control elements with their respective children), here for respective 
  // for on-the-fly-styling of different in the dom tree
})
export class ControlComponent implements AfterContentInit {

  // For backward compatibilty
  // directly indide the component class
// @HostBinding('class')  propertyVariableName = 'control';

// @HostListener('click') someFoo() {
//   console.log("Bounded someFoo()")
// }

private elem = inject(ElementRef);

// Programmatic Access of Host Element
// private elemnt = inject(ElementRef);
//ElementRef: angular wrapper of native DOM elements

// Template variables

label = input.required<string>();

// With @ContentChild decorator
@ContentChild('projectContentTemplateVariable') private control?: ElementRef<HTMLInputElement | HTMLTextAreaElement>;

// using signal
// private controlSignal= contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('projectContentTemplateVariable');

ngAfterContentInit(): void {
    
}

onClick() {
  console.log("clicked!!");
  console.log(this.elem);
  console.log(this.control);
  // console.log(this.controlSignal());
}
}
