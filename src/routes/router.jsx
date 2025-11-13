import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import AllMovies from "../pages/AllMovies";
import MyCollection from "../pages/MyCollection";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import MovieDetails from "../components/MovieDetalis/MovieDetails";
import AddMovie from "../pages/AddMovie";
import EditMovie from "../components/EditMovie/EditMovie";
import Watchlist from "../pages/Watchlist";
import ProtectedRoute from "./ProtectedRoute";
import { Atom } from "lucide-react";
import PageNotFound from "../components/PageNotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    hydrateFallbackElement: (
      <div className="flex items-center justify-center h-52">
        <Atom color="#3280cd" size="50" text="" />
      </div>
    ),
    errorElement: <PageNotFound />,
    Component: RootLayout,
    children: [
      {
        index: true,
        loader: () =>
          fetch("https://movies-master-pro-api-server.vercel.app/watchlist"),
        Component: Home,
      },
      {
        path: "/all-movies",
        loader: () =>
          fetch("https://movies-master-pro-api-server.vercel.app/watchlist"),
        element: <AllMovies />,
      },
      {
        path: "/movie-details/:id",
        Component: MovieDetails,
      },
      {
        path: "/my-collection",
        element: (
          <ProtectedRoute>
            <MyCollection />
          </ProtectedRoute>
        ),
      },
      {
        path: "/edit-movie/:id",
        element: (
          <ProtectedRoute>
            <EditMovie isEdit={true} />
          </ProtectedRoute>
        ),
      },
      {
        path: "/add-movie",
        loader: () =>
          fetch("https://movies-master-pro-api-server.vercel.app/watchlist"),
        element: (
          <ProtectedRoute>
            {" "}
            <EditMovie isEdit={false} />
          </ProtectedRoute>
        ),
      },
      {
        path: "/watchlist",
        element: (
          <ProtectedRoute>
            <Watchlist />
          </ProtectedRoute>
        ),
        loader: () =>
          fetch("https://movies-master-pro-api-server.vercel.app/watchlist"),
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
