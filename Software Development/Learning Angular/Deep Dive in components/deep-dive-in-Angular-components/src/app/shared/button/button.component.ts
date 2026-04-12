import { Component } from '@angular/core';

@Component({
  selector: 'button[appButton]',  // attribute seletor
  //  another way to select element in Angular,
  //  Extended form of CSS selectors, read the documentation
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

}
