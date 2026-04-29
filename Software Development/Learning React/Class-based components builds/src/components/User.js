import { Component } from 'react';
import classes from './User.module.css';

// Class-based component
class User extends Component {

  // constructor() {}

  // Rendering method expected by react
  render() {
    return <li className={classes.user}>
      {
        this.props.name // The props of the instance of User
        // Do all JS OOP concepts apply to class-based components?
      }
    </li>;
  }
}

// Functional User component
// const User = (props) => {
//   return <li className={classes.user}>{props.name}</li>;
// };

export default User;
