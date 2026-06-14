const redux = require("redux");

// Example of Reducer function
// State has to have an initail value or default value 
// to allow the first time run 
// Action has types which act like identifier of the tpye of 
// action wanted to be performed in the reducer function
// by simply simply using branching statements
const counterReducer = (state = { counter: 0 }, action) => {
    // these are the action types indeed
    if (action.type === 'increment') {
        return {
            counter: state.counter + 1
        };
    }
    if (action.type === 'decrement') {
        return {
            counter: state.counter - 1
        };
    }
}

// Creating the store
const store = redux.createStore(counterReducer);

// A subscriber
const counterSuscriber = () => {
    // Latest state
    const latestState = store.getState();

    // usage
    console.log(latestState);
}

// Making a subscritpition
store.subscribe(counterSuscriber)

// Dispacthing actions
// Note: Disptaching in dev simply means delegating the 
// call of a method or a function to another function 
// inside which the call is performed 
store.dispatch({ type: 'increment' });
store.dispatch({ type: 'decrement' });