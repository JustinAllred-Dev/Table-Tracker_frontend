import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import NewReservation from "../reservations/NewReservation";
import NewTable from "../tables/NewTable";
import NewSeat from "../seating/NewSeat";
import NewSearch from "../Searching/NewSearch";
import { today } from "../utils/date-time";
import useQuery from "../utils/useQuery";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const query = useQuery();

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/reservations/new">
        <NewReservation />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <NewSeat />
      </Route>
      <Route exact={true} path="/dashboard">
        <Dashboard date={query.get("date") || today()} />
      </Route>
      <Route path="/tables/new">
        <NewTable />
      </Route>
      <Route path="/search">
        <NewSearch />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
