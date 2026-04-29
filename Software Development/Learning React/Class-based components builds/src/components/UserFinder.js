import { Fragment, useState, useEffect, Component } from 'react';

import Users from './Users';
import classes from './UserFinder.module.css';
import UsersContext from '../store/users-context';

const DUMMY_USERS = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];

class UserFinder extends Component {
  static contextType = UsersContext;
  // In class based components, only a single context can 
  // be used unlike in the functional approach where multiple conexts can be listened to

  constructor() {
    super();
    this.state = {
      filteredUsers: DUMMY_USERS,
      searchTerm: ''
    };
  }

  // in place of use... ?
  componentDidMount() {
    this.setState({ filteredUsers: this.context.users });
  }

  // Prior to useEffect hook
  // react's Component class has components lifecycle methods
  // an example is componentDidUpdate() which can be 
  // used in place of the useEffect hook
  componentDidUpdate(prevProps, prevState) {
    // Always check before changing the state to avoid an 
    // infinite loop at each reconstruction
    // useEffect checks this automatically
    if (prevProps.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: this.context.users.filter((
          user) => user.name.includes(this.state.searchTerm)),
      });
    }
  }

  searchChangeHandler(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      <Fragment>
        <div className={classes.finder}>
          <input type='search' onChange={this.searchChangeHandler.bind(this)} />
        </div>
        <Users users={this.state.filteredUsers} />
      </Fragment>
    );
  }
}

// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     setFilteredUsers(
//       DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//     );
//   }, [searchTerm]);

//   const searchChangeHandler = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <Fragment>
//       <div className={classes.finder}>
//         <input type='search' onChange={searchChangeHandler} />
//       </div>
//       <Users users={filteredUsers} />
//     </Fragment>
//   );
// };

export default UserFinder;