import { ReactNode } from "react";
import BreathingPage from "./pages/Breathing";
import ClockPage from "./pages/Clock";

interface Route {
  path: string,
  Component: ReactNode,
}

export const LOGIN_ROUTE = '/login';
export const CLOCK_ROUTE= '/clock';
export const BREATHING_ROUTE= '/breathing';

export const publicRoutes: Route[] = [
  {
    path: LOGIN_ROUTE,
    // Component: Login,
    Component: <ClockPage />,
  },
  {
    path: '/*',
    Component: <p>404</p>
  },
]

export const privateRoutes: Route[] = [
  {
    path: CLOCK_ROUTE,
    Component: <ClockPage />,
  },
  {
    path: BREATHING_ROUTE,
    Component: <BreathingPage />,
  },
  {
    path: '/*',
    Component: <p>404</p>
  },
]