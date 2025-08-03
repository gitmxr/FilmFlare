import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import MovieDetail, {
  movieDetailLoader,
} from "./Components/MovieDetail/MovieDetail";
import Music from "./Components/Music/Music";
import MusicDetail from "./Components/Music/MusicDetail";
import { musicDetailLoader } from "./loaders/musicDetailLoader";
import { homeLoader } from "./loaders/homeLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // All pages wrapped with Layout (includes Header now)
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "music",
        element: <Music />,
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
      {
        path: "music/:id",
        element: <MusicDetail />,
        loader: musicDetailLoader,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
