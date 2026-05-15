import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import ProductPage from "./pages/Products";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import DetailsPage from "./pages/Details";


// Object route definition approach 
// const appRouter = createBrowserRouter([  // Takes an array of routes
//   { path: '/', element: <HomePage /> }, // single route 
//   // with always {path} field set

//   { path: '/products', element: <ProductPage /> },
// ]);

const appRouter = createBrowserRouter([  // Takes an array of routes
  {
    path: '/home',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      // { path: '/', element: <HomePage /> }, // starting with '/',
      // absolute path
      { path: '', element: <HomePage /> }, // starting with '/', 
      { path: 'products', element: <ProductPage /> }, // relative path
      // Dynamic route, ":" is used to indicate the part 
      // of the route which is dynamic, all settings are passed as 
      // an object, which can be received as route param 
      // by using the useParams hook,
      // dynamic fields name (productId here) have
      //  to math when access in the component
      { path: 'products/:productId/details', element: <DetailsPage /> }
    ],
  },
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
