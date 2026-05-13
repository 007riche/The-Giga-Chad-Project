import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import ProductPage from "./pages/Products";


// Object route definition approach 
const appRouter = createBrowserRouter([  // Takes an array of routes
  { path: '/', element: <HomePage /> }, // single route 
  // with always {path} field set

  { path: '/products', element: <ProductPage /> },
]);

// Embedded route in elements of the components by using 
// Route component from react-router-dom instead
// Component definition approach
// const routeDef = createRoutesFromElements(
//   <Route>
//     <Route path="/" element={<HomePage />} />
//     <Route path="/prod" element={<ProductPage />} />
//   </Route>
// );

// // and still need this
// const appRouter = createBrowserRouter(routeDef);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
