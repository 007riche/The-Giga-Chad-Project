import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, output, viewChild, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from "../../../shared/control/control.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
  }
  @ViewChild('formTemplateVar') form?: ElementRef<HTMLFormElement>; // Holding just a Single element of this type 
  // at this declaration time, not the intended instance 

  // ver 17.3 of NG with signal
  // private formSignal = viewChild.required<ElementRef<HTMLFormElement>>('formTemplateVar');

  add = output<{title: string, text: string}>();

// onSubmit(titleInputTemplateVariable: HTMLInputElement) {
  onSubmit(title:string, request: string) {
    this.add.emit({title: title, text: request});
// console.log(titleInputTemplateVariable);
console.log(title);
console.log(request);

this.form?.nativeElement.reset(); // Get the instance element accessed through nativeElement property,
// just as the value property

// this.formSignal().nativeElement.reset(); // signal way
// The same concept is available to the projected content of customs utily components
// such as our Control component
// See Control component
}

}




// CUSTOM 2-WAY BINDING
// for declaring the input direction, declare the variable and Decorate it with @Input
// for declaring the output direction, use the same name concatenated with "Change" and decorated with the @Output decorator

// In places where it is bound, use the [( )] syntax to bind it just like an [( ngModel )] binding
// Ex: 

// @Input({ required: true}) size!: {with: string; height: string};
// @Output()   sizeChange = new EventEmitter<{with: string; height: string}>();

// Binding in the template:
// [( size )]=" someAction()"

// CUSTOM 2-WAY BINDING using Signal
// size = model.required<{ structure }>();
// usable like a signal