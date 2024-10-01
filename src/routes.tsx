import { createBrowserRouter, Navigate } from "react-router-dom";
import { Unlock } from "./pages/Unlock";
import { Dashboard } from "./pages/Dashboard";
import { AuthGuard } from "./components/AuthGuard";
import { NavBarLayout } from "./components/NavBarLayout";
import { CenterLayout } from "./components/CenterLayout";

export const routeNames = {
  unlock: "/unlock",
  dashboard: "/dashboard",
};

export const routes = createBrowserRouter([
  {
    path: routeNames.unlock,
    element: (
      <CenterLayout>
        <Unlock />
      </CenterLayout>
    ),
  },
  {
    path: routeNames.dashboard,
    element: (
      <AuthGuard>
        <NavBarLayout>
          <Dashboard />
        </NavBarLayout>
      </AuthGuard>
    ),
  },

  {
    path: "/",
    element: <Navigate to={routeNames.unlock} />,
  },
]);
