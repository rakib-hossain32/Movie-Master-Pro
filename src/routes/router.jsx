import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import AllMovies from "../pages/AllMovies";
import MyCollection from "../pages/MyCollection";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home ,
      },
      {
        path: "/all-movies",
        element: <AllMovies />,
      },
      {
        path: "/my-collection",
        element: <MyCollection />,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
 
]);
