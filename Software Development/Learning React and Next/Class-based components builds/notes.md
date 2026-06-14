# Class-based components

## Functional components VS Class-based components (React < 16.8 with absence o react hooks prior to that version) <br />
Functional approach:
```
const User = (props) => {
  return <li className={classes.user}>{props.name}</li>;
};
```
<br />
Class-based approach
<pre>
class User extends Component {
   constructor() {}
Rendering method expected by react
  render() {
    return < li className={classes.user}>
      {
        this.props.name 
        // The props of the instance of User
        // Do all JS OOP concepts apply to class-based components?
      }
    </li>;
  }
}
</pre>

Class-based components are based on the concept of classes in Javascript. 
A Class-based component should contain a render() method, expected by react to contain the logic related to rendering the markup of the componenet. 
A class-based component should also extends the "Component" class from react in order to inherit its properties, Hence receiving the props (Example in User component). 