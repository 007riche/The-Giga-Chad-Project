> # Redux for managing state
### Local state:
state belonging to a single component, managed via useState, UseReducer

### Cross-component state 
affecting multiple components, basically managed by prop drilling

### APP-wide state
Affecting the entire app, high level parts o fthe app (such as auth, theme system etc...),
can be managed by prop drilling, Context, Redux. a problem that might arise is a heavy context or nested contexts, high-frequency state changes

### Let's come to Redux, single truth pill...?
<pre>
        +-------------------->(Reducer function)
        |  Forwarded to              |
        |               +--------------------------------+
        |               | input: old state + Dispatch    |
        |               |           action function      |
    +--------+          |              |                 |
    | Action |          |             \ /                |
    +--------+          |            Output:             |
       / \              |            New state           |
        |               +--------------------------------+
        |                               |
        |                               | Mutate data in the store
        |                               |
        |                              \ /
        |               +---------------------------------+     
        |               | Central Data (state) Store      |
        |               |      Only a single state.       |
        |               +---------------------------------+     
        |                               |
        |                               |  Subscription
        |                               |
        |                              \ /
        |Dispatch       +---------------------------------+     
        +--------------+|        Components               |
                        +---------------------------------+     
</pre>

Redux is not react specific package, but rather JS related.
<br/>
To install redux: `$npm install redux react-redux`
@react-redux connects the redux to react

How to pass argument or a payload to action to the reducer action types?
setting them on the action object as its properties

In reducer function, the state should be immutable, If update is needed, a new store must be created containing the updated values, to avoid accidental edition of the states contained. The store remaing the global app state

## Redux toolkit
Install: ```$npm install @reduxjs/toolkit```