import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createStore } from "redux";

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

const initialAuthState = {
    isAuthenticated: false
};

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login(state) { state.isAuthenticated = true; },
        logout(state) { state.isAuthenticated = false; }
    }
});


// Redux
const counterReducer = (state = initialCounterState, action) => {
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

// Redux
// const store = createStore(counterReducer);

// Redux Toolkit
// const store = createStore(counterSlice.reducer); // Acceptable due 
// to the small size of the store (only a single state in the store) 
const store = configureStore({ // Configure global state
    reducer: { // main reducer for the global state

        // reducer: counterSlice.reducer // Single slice
        // Map all your reducers here
        counter: counterSlice.reducer,
        auth: authSlice.reducer,
    }
});

// Slice actions
export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;

export default store;