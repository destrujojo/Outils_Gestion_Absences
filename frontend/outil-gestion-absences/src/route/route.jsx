import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/404";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";

export const ROUTES = {
  HOME: "/",
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
    ],
  },
]);

export default router;
