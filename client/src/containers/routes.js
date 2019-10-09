import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import Course from "./course";
import Sign from "./sign";
import Dashboard from "./dashboard";


const Routes = () => {
  return (
    <Switch>
      <Route exact path='/course/:id' component={Course} />
      <Route exact path='/login' component={Sign} />
      <Route exact path='/register' component={Sign} />
      <Route exact path='/dashboard' component={Dashboard} />
    </Switch>
  );
};

export default withRouter(Routes);
