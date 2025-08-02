import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import MovieDetail, { movieDetailLoader } from "./Components/MovieDetail/MovieDetail";

import { homeLoader } from "./loaders/homeLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true, 
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "movie/:id",
        element: <MovieDetail />,
        loader: movieDetailLoader,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
