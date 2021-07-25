import { ReactNode } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteProps,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import { Activate } from "./components/auth/Activate";
import { SignIn } from "./components/auth/SignIn";
import { SignUp } from "./components/auth/SignUp";
import { NotFound } from "./components/errors/NotFound";
import { Home } from "./components/home/Home";
import { AuthLayout } from "./components/layouts/AuthLayout";
import { MainLayout } from "./components/layouts/MainLayout";
import { useSession } from "./hooks/session";

export interface RouterLocationState {
  is404?: boolean;
  fallback?: string;
}

interface PrivateRouteProps {
  children: ReactNode;
  // eslint-disable-next-line react/require-default-props
  loggedFallback?: string;
  [key: string]: any;
}

const RedirectAs404 = ({ location }: RouteProps) => (
  <Redirect to={{ ...location, state: { is404: true } }} />
);


export function useFallbackRouter() {
  const location = useLocation<RouterLocationState>();
  const history = useHistory();

  return {
    hasFallbackRoute: !!location.state?.fallback,
    fallback: () =>
      location.state?.fallback && history.push(location.state.fallback),
  };
}

const SessionRoute = ({
  children,
  loggedFallback,
  ...props
}: PrivateRouteProps) => {
  const { isLoggedIn, hasDevice } = useSession();

  return (
    <Route
      {...props}
      render={
        ({ location }) => (
          <>
            {!isLoggedIn && !loggedFallback && <Redirect to={{ pathname: '/auth/sign-in', state: { fallback: location } }}/>}
            {isLoggedIn && !hasDevice && !loggedFallback && <Redirect to={{ pathname: '/auth/device', state: { fallback: location } }}/>}
            {isLoggedIn && loggedFallback && <Redirect to={loggedFallback}/>}
            {children}
          </>
        )
      }
    />
  );
};


const AllRoutes = () => (
  <Switch>
    <SessionRoute path="/auth" loggedFallback="/">
      <AuthLayout>
        <Switch>
          <Route path="/auth/sign-in" component={SignIn} />
          <Route path="/auth/sign-up" component={SignUp} />
          <Route path="/auth/activate/:validationCode" component={Activate} />
          <Route path="/auth/activate" component={Activate} />
          <Route path="/auth/device" component={() => <div>HEY</div>} />
          {/* <Route
            path="/auth/reset-password/:token?"
            component={ResetPassword}
          /> */}
          <Route component={RedirectAs404} />
        </Switch>
      </AuthLayout>
    </SessionRoute>

    <SessionRoute>
      <MainLayout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route component={RedirectAs404} />
        </Switch>
      </MainLayout>
    </SessionRoute>
    <Route component={RedirectAs404} />
  </Switch>
);

export function Routes() {
  return (
    <Router>
      <Route
        render={({ location }: any) =>
          location.state && location.state.is404 ? <NotFound /> : <AllRoutes />
        }
      />
    </Router>
  )
}