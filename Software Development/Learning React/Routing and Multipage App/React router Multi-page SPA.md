Install: `$npm install react-router`. <br/> 
Install: `$npm install react-router-dom`

create a route with createBrowserRouter() from react-router-dom

wrap the router of the component with RouterProvider from the same package.

for using a wrapping component as a kind of scafold (like a component containaing the header and the footer of a website), which is needed to be included on the final render of a set of components, we can define a main path, and add other path as its parts through the children array prop of its router definition
<br/>
The scafold component uses the Outlet component which represents the other element passed to it to be wrapped.
<br/>
Some components are provided by react-router-dom like Link, NavLink
<br/>
the className of the NavLink receives a function instead of expression as usaul, some props are forwarded to that function by default by react-router-dom