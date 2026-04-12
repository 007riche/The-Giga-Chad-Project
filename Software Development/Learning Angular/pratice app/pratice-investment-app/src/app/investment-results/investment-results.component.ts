import { Component, inject, Input, input } from '@angular/core';
import { InvestmentResult } from './investment-result.model';
import { CurrencyPipe } from '@angular/common';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-investment-results',
  imports: [CurrencyPipe],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css'
})


export class InvestmentResultsComponent {
// @Input() results?: InvestmentResult[]; 
private investmentService = inject(InvestmentService);

get results() {
  return this.investmentService.resultsData;
}
}
