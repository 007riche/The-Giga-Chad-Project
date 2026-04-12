import { Component } from '@angular/core';
import { RedirectLinkDriective } from '../redirect-link.directive';

@Component({
  selector: 'app-learning-resources',
  templateUrl: './learning-resources.component.html',
  styleUrl: './learning-resources.component.css',
  standalone: true,
  imports: [RedirectLinkDriective]
})
export class LearningResourcesComponent {}
