<pre>
            <---base--->
        +-------------------+
         \                 /
          \               /
           \             /
            \           /
             \         /
              \       /
               \     /
                \   /
                 \ /
                  +
</pre>

The base is the lifted state within minimized changes to avoid the re-exec of children (towards the down peak) 
The smaller the base, the Better?

## Good Composition matters
- ### creating scopoed sub-components with their re-exec conditon and lifting state up

- ### Scoping the re-execution to the least child as possible in the component hierachy
 
- ### Scoping state on elements with keys (generally on dynamcally generated elements such as li for instance)
Keys can be used to strictly map elements in the DOM tree, help with the state management of elements, used in resetting elements (usecase: the key on the Counter component in the APP component)

- ### Make good use of state updation, taking into account the previous state
prefer this updation `setState(prevState => { // updation with new state})` method over this method: `setState(newState)`. the latter usage may cause updation in next cycle if for instance immediate subsequent updation happen like this
<pre> <code>
        setState(newState); // updated, even this can be dangerous or lead to errors
        setState(newState); // will be update in next updation cycle
    </code></pre>


## Avoid unecessary component function re-executions
- ### wrapping components with the memo() from react package
One way to avoid the re-execution of a component over and over again is to wrap the component with the memo function provided by react. <br/>
Note that it should wrapped the highest component as possible in the component tree that is not affected by the change of the condition element (a state for instance that has been past to that highest compoent scoped unecessary re-built) that triggers the re-execution of that component. <br />
`Drawback`: it has a cost,the evaluation of the condition on which the component function should re-exec (typically a state or a callback function passed as a prop) each time a subtree of component re-execution is triggered even though the function of that highest component is not triggered after that change condition is done
<br />
For that same reason it is advised not to overuse this function in the component hierarchy, at least on subseqent components of the selected subtree from that highest component from which, based the specific conditon, this sub-tree does not have to be re-built.
```Example: memo on Counter```

- ### Completing the memo advantage with the useCallBack
memo looses its precedence on a triggering evaluation set by passed to the actual component if set by its parent component. (usecase: IconButton reval forced by the counter state in Counter component). a way to tacle this is to avoid the unecessary reval from inside parent compoenet, but now scoping the reval only to that parent component, preserving its children to reval also by using the useCallBack hook (to maintain same deps each reval cycle of that parent component on which its children are based on, here handleIncrement, handleDecrement for IconButton from inside Counter, the parent Component)

- ### use the useMemo hook to prevent the re-creation of other general purpose custom functions defined and used that can sometimes by computer intensive
```usecase: isPrime() in Counter```  It does cost some performance also just as other hooks

## Not to abuse of the use of React Hooks
Even though their usage can be good, using them do cost some performance, and the should only where the tracking of changes of their dependencies evaluation do matter and avoid where they are not (typically where the re-exec will not occur or least of the time, for instance, in a component that (should) never rebuilt through the app lifecycle like a stateless component )

## Optimization frameworks
Example: MillionJS
installation ```$npm install million```
Refer to its Docs