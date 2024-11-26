import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Signin from "./signin";
import Signup from "./signup";

const Auth = () => {
  const user = useSelector((state) => state.Auth.user);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.replace("/");
    }
  }, [user, history]);

  if (user) return null;

  return (
    <Switch>
      <Route path="/auth/signup" component={Signup} />
      <Route path="/auth" component={Signin} />
    </Switch>
  );
};

export default Auth;
