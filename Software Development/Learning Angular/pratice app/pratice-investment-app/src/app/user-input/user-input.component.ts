import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserInputData } from './user-input.model';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-user-input',
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {
  // @Output() calculateEvent = new EventEmitter<UserInputData>(); // No more needed 
  // because of the refactoring into service using property binding
  // inputtedData: UserInputData = {
  //   initialInvestment: 0,
  //   annualInvestment: 0,
  //   expectedReturn: 5,
  //   duration: 10,
  // };

  constructor(private investmentService: InvestmentService) {}

  // placeHolderInputData: UserInputData = {
  initialInvestment = signal(0);
  annualInvestment = signal(0);
  expectedReturn = signal(5);
  duration = signal(10);
  // };

  // inputtedData = signal<UserInputData>(this.placeHolderInputData);

  onSubmit() {
  let inputtedData: UserInputData = {
    initialInvestment: + this.initialInvestment(), // because it is signal
    annualInvestment: + this.annualInvestment(),
    expectedReturn: + this.expectedReturn(),
    duration: + this.duration()
  };
     
    this.investmentService.calculateInvestmentResults(inputtedData);
    // // Parsing strings of inputs into number
    // this.inputtedData.initialInvestment = + this.inputtedData.initialInvestment;
    // this.inputtedData.annualInvestment = + this.inputtedData.annualInvestment;
    // this.inputtedData.expectedReturn = + this.inputtedData.expectedReturn;
    // this.inputtedData.duration = + this.inputtedData.duration;

    // // Triggering Calcultaion Event
    // this.calculateEvent.emit(this.inputtedData);}

    // this.calculateEvent.emit({ // No more Needed, refactory using service 
    //   expectedReturn: this.expectedReturn(),
    //   initialInvestment: this.initialInvestment(),
    //   annualInvestment: this.annualInvestment(),
    //   duration: this.duration(),
    // });

    this.expectedReturn.set(5);
    this.initialInvestment.set(0);
    this.annualInvestment.set(0);
    this.duration.set(10);
  }
}
