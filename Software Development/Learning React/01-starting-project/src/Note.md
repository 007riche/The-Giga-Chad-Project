To tackle unecessary parent tag element, we can use the `Fragment` component provided by react to wrap the part for which we don not necessarily need a parent such as a void div. currently modern react supports this empty tag syntax also: <pre><code>
<>
parts...
</>
</code></pre>

by default properties set on compoenent such as id, classNames, events (...) are not forwared by react when rendering the dom tree, and are lost

Forwarding props can be achieved using spread operator by accepting these properties in their definition:
```export default function Compnt({ firstpropArg, secondPropArg, ...remainder}) {
    return (
        <elm firstprop={firstpropArg} second={secondPropArg} {...prop}>
        body
        </elm>
    );
}
```
usage:
````
<Compnt id="SomeID" className="someClass" onClick={() => {someProcess()}}  firsProp={} second={}/>
```