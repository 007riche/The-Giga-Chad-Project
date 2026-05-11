import { createStore } from "redux";
const initialState = {
    counter: 0,
    showCounter: true,
};
const counterReducer = (state = initialState, action) => {
    if (action.type === 'increment') {
        return {
            counter: state.counter + 1,
            // ...state, // Seems not to work
            showCounter: state.showCounter
        };
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