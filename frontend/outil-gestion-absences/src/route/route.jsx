import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/404";
import Home from "../pages/Home";
import Home_Admin from "../pages/Home_Admin";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";

export const ROUTES = {
  HOME: "/",
  HOME_ADMIN: "/Home_Admin",
  LOGIN: "/login",
  ERROR: "/404",
};

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.HOME,
        element: <PrivateRoute />,
        children: [
          {
            path: ROUTES.HOME,
            element: <Home />,
          },
        ],
      },
      {
        path: ROUTES.LOGIN,
        element: <Login />,
      },
      {
        path: ROUTES.HOME_ADMIN,
        element: <Home_Admin />,
      },
    ],
  },
]);

export default router;
