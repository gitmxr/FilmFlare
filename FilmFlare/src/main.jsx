import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import Home from './assets/Components/Home/Home';
import About from './assets/Components/About/About';
import Contact from './assets/Components/Contact/Contact'; 

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
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>,
)
