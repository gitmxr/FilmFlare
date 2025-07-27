import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Contact from './Components/Contact/Contact'; 
import MovieDetail from './Components/MovieDetail/MovieDetail'; // ✅ Import this

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, 
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />, 
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'movie/:id',  // ✅ Add this route
        element: <MovieDetail />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

