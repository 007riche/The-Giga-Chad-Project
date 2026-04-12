import { Component, computed, signal, Input, Output, EventEmitter } from '@angular/core';

import { type User } from './user.model';
import { DUMMY_USERS } from '../../dummy-users';
import { CardComponent } from '../shared/card/card.component';


const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);

// Refactored
// in the dedicated file: user.model.ts



@Component({
  selector: 'app-user',
  imports: [CardComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent {

  // Old fashion state management with getters
// selectedUser= DUMMY_USERS[randomIndex];
get imagePath() {
  // return 'assets/users/'+this.selectedUser.avatar;
  return 'assets/users/'+this.user.avatar;  // because avatar is inputted into the component
}

// Signal initialization 
// selectedUser = signal(DUMMY_USERS[randomIndex]); // declaration with an initial value, 
// selectedUser is the resulting signal object declared and initialized
// Usage: signalName() --> selectedUser()

// imagePath = computed(() => 'assets/users/'+this.selectedUser().avatar); // One retrieved value from the signal,
// this is basically a signal

// input signal
// avatar = input.required<string>(); // NotWritable signal  (set mtehod does not work on it)
// imagePath = computed(() => 'assets/users/'+this.avatar());  // assignment child also a signal 

// output signal with output function
// select = output<string>();  // Typing required for an expected type hence the <string>

// @Input({required: true})
//   id!: string; // Settable from outside //Litteral

//   @Input({required: true}) // required: condition of initial value
//   avatar!: string; // Settable from outside //Litteral

//   @Input({required: true})
//   name!: string; // Settable from outside  //Litteral

// Refactoring
@Input({required: true}) user!: User;

@Input({required: true}) selected!: boolean;




@Output() select = new EventEmitter<string>(); // Output event fire with a string data

onSelectedUser() {

// this.selectedUser.set(DUMMY_USERS[randomIndex])
this.select.emit(this.user.id); // emitting a value as sigmple output, not a signal

}

}
