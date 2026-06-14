import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import BlogPage, { loader as postsLoader } from './pages/Blog'; // eager
import HomePage from './pages/Home';
// import PostPage, { loader as postLoader } from './pages/Post';
import RootLayout from './pages/Root';
import { lazy, Suspense } from 'react';

// All these import are eager loadings,
// lazy loading to optimize the code loading on visit

const BlogPage = lazy(() => import('./pages/Blog')); // Lazy loading
// lazy is provided by react to achieve that purpose
const PostPage = lazy(() => import('./pages/Post')); // Lazy loading

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        children: [
          {
            index: true,
            element: <Suspense fallback={<p>Loading the blog pages</p>}>
              <BlogPage />
            </Suspense>,
            // loader: postsLoader // eager loading
            loader: () => import('./pages/Blog') // returns a promise
              .then(module => module.loader()) // inline import, 
            // imported only when needed
          },
          {
            path: ':id',
            element: <Suspense fallback={<p>Loading the post....</p>}>
              <PostPage />
            </Suspense>,
            // loader: postLoader 
            loader: (meta) => import('./pages/Post') // either forward 
              // { params } or the meta object
              .then(mod => mod.loader(meta)),
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
