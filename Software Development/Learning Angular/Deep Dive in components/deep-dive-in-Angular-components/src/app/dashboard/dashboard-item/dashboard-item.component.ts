import { Component, input, Input, ViewEncapsulation } from '@angular/core';
import { noop } from 'rxjs';

@Component({
  selector: 'app-dashboard-item',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-item.component.html',
  styleUrl: './dashboard-item.component.css',
  // encapsulation: ViewEncapsulation.None,
  // host: {
  //   class: "dashboard-item",
  // },
  // substitution directly inside the style sheet
  
})
export class DashboardItemComponent {
  // Property approach
// @Input({required: true})  image!: {
//   src: string;
//   alt:string
// };
// @Input({required: true})  title!: string;

// signal approach
image =input.required<{
  src: string;
  alt:string
}>();
title = input.required<string>();
}
