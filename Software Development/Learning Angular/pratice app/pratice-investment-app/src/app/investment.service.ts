import { Injectable, signal } from "@angular/core";
import type { InvestmentResult } from "./investment-results/investment-result.model";
import type { UserInputData } from "./user-input/user-input.model";

@Injectable({providedIn: 'root'})
export class InvestmentService {


    resultsData?: InvestmentResult[];
    // resultsDataSignal= signal<InvestmentResult[] | undefined>(undefined);


    calculateInvestmentResults(data: UserInputData) {
       
        const annualData: InvestmentResult[] = [];
       
        let investmentValue = data.initialInvestment;
      
        for (let i = 0; i < data.duration; i++) {
          const year = i + 1;
          const interestEarnedInYear = investmentValue * (data.expectedReturn / 100);
          investmentValue += interestEarnedInYear + data.annualInvestment;
          const totalInterest =
            investmentValue - data.annualInvestment * year - data.initialInvestment;
          annualData.push({
            year: year,
            interest: interestEarnedInYear,
            valueEndOfYear: investmentValue,
            annualInvestment: data.annualInvestment,
            totalInterest: totalInterest,
            totalAmountInvested: data.initialInvestment + data.annualInvestment * year,
          });
        }
      
        this.resultsData = annualData;
        // this.resultsDataSignal .set(annualData); // using signal
      }
}