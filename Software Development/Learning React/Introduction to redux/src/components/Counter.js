import { connect, useDispatch, useSelector } from 'react-redux';
import classes from './Counter.module.css';
import { Component } from 'react';

const Counter = () => {
  //access directly the redux store
  // Here, we didn't need to use useContext()
  // Redux is in charge of it, in different way, but in charge 
  // useSelector give access to part of the global state managed by redux store
  const counter = useSelector(state => state.counter);
  const showCounter = useSelector(state => state.showCounter);

  // useDispatch returns a dispatching functing that can 
  // be use to dispatch an action to the store
  const ourDispatcher = useDispatch(); // redux in charge of the 
  // binding to the store

  // Our top level dispatchers
  const incrementHandler = () => {
    ourDispatcher({ type: 'increment' });
  }
  const decrementHandler = () => {
    ourDispatcher({ type: 'decrement' });
  }

  const op = '*';
  const stepVal = 7;
  const stepper = () => {
    ourDispatcher({ type: 'stepper', operator: op, step: stepVal });
  }

  // decrementHandler() {
  //   ourDispatcher() {
  //     counterReducer();
  //   }
  // }

  const toggleCounterHandler = () => {
    ourDispatcher({ type: 'toggle' })
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter &&
        <div className={classes.value}>{counter}</div>
      }
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={decrementHandler}>Decrement</button>
        <button onClick={stepper}>Step {op} {stepVal}</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

// const Counter =
class ClassBaseCompentApproach extends Component {
  incrementHandler() {
    this.props.increment();
  }
  decrementHandler() {
    this.props.decrement();
  }
  toggleCounterHandler() { }

  render() {
    return (
      <main className={classes.counter}>
        <h1>Redux Counter</h1>
        <div className={classes.value}>{this.props.counter}</div>
        <div>
          <button onClick={this.incrementHandler.bind(this)}>Increment</button>
          <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
        </div>
        <button onClick={this.toggleCounterHandler.bind(this)}>Toggle Counter</button>
      </main>
    );
  }
}

// state is the state from redux
// props (name custom, but the type of the object bound 
// is unchanged at entity level)
const mapStateToProps = state => {
  return {
    counter: state.counter
  };
}

// dispatcher
// dispatch provided by redux (name custom)
const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch({ type: 'increment' }),
    decrement: () => dispatch({ type: 'decrement' }),
    // here it 'operator' and 'step' which are used as payloads' name
    stepper: () => dispatch({ type: 'stepper', operator: '+', step: 5 }),
  }
};



// export default connect(mapStateToProps, mapDispatchToProps)(ClassBaseCompentApproach);
// export default connect(mapStateToProps, mapDispatchToProps)(Counter);
// connect, higher order component, 
// connect()--> (<-|returnedFx)(arg: Counter, mapPropsFx, mapDispatchFx)

export default Counter;
