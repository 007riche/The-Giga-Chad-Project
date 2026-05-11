import { createSlice } from "@reduxjs/toolkit";
import { createStore } from "redux";
const initialState = {
    counter: 0,
    showCounter: true,
};

// Redux toolkit way
// To create and manage parts of the store
createSlice({
    name: 'counter', // one state of the store
    initialState: initialState, // initialization
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
            state.counter = eval(`${state.counter} ${action.operator} ${action.step}`);
        },
        toggle(state) { // 
            state.showCounter = !state.showCounter;
        },
    }
});

const counterReducer = (state = initialState, action) => {
    if (action.type === 'increment') {
        // Like mutating here
        // state.counter = ;

        return {
            // all the states should be recopied here, in the new state
            counter: state.counter + 1,
            // ...state, // Seems not to work
            showCounter: state.showCounter
        }; // New state object containing the updates, should stay immutable
        // Eureka! the state object is always overriden, not Mutated
        // Side note: Manually mutating the state before returning it
        //  is also bad practice, can lead to unwanted or unpredictible bug
    }
    if (action.type === 'decrement') {
        return {
            counter: state.counter - 1,
            // ...state,
            showCounter: state.showCounter
        };
    }

    // How to pass a payload to an action type?
    // Inside the dispatching, just set these arg or payload 
    // in a named arguement passing style, here operator and step
    //  bundled through action
    if (action.type === 'stepper') {
        return {
            counter: eval(`${state.counter} ${action.operator} ${action.step}`),
            // ...state,
            showCounter: state.showCounter
        };
    }

    if (action.type === 'toggle') {
        return {
            showCounter: !state.showCounter,
            // ...state,
            counter: state.counter
        };
    }

    return state;
}

const store = createStore(counterReducer);

export default store;