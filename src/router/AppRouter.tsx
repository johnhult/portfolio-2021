import React from "react";
import { Route, Switch, RouteComponentProps } from "react-router-dom";

import LoadableView from "./LoadableView";

/**
 * Main application router
 * @see https://reacttraining.com/react-router/web/guides/quick-start
 *
 * You are strongly advised to keep that layer stateless.
 * Handling a state at such a high level might lead to unpredictable results.
 * And even though surprises may be cool, users tend not to like unpredicable applications.
 *
 * If you need to consume anything from a specific route, use the context API
 * If you need to fetch data (like content for instance), load it from within the view itself
 */
const AppRouter = () => (
  <Switch>
    <Route
      exact
      path="/"
      render={(props: RouteComponentProps) => (
        <LoadableView {...props} view="HomeView" />
      )}
    />
    {/* <Route
      render={(props: RouteComponentProps) => (
        <LoadableView {...props} view="NotFoundView" />
      )}
    /> */}
  </Switch>
);

export default AppRouter;
