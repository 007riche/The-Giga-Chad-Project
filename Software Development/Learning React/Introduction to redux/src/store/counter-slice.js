import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = {
    counter: 0,
    showCounter: true,
};

// Redux toolkit way
// To create and manage parts of the store
const counterSlice = createSlice({
    name: 'counter', // one state of the store
    initialState: initialCounterState, // initialization
    reducers: { // define all the reducers on that state
        // they receive the state, and the action even 
        // though some of them are omitted because not used
        increment(state) { // 
            state.counter++; // This normally is prohibited, because
            // mutating directly the state,
            // But, BTS, @reduxToolkit, creates new state object with this 
            // updation and returns it (function as a wrapper around our 
            // manipulations on the state)
        },
        decrement(state) { // 
            state.counter--;
        },

        stepper(state, action) { // 
            // The payload field in action is reserved for 
            // transmitting payload to reducers
            state.counter =
                eval(`${state.counter} ${action.payload.operator} ${action.payload.step}`);
            console.log("Stepper through Redux Toolkit");
        },
        toggle(state) { // 
            state.showCounter = !state.showCounter;
        },
    }
});


export const counterActions = counterSlice.actions;
export default counterSlice.reducer;
