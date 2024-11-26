import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch, useLocation, useHistory } from "react-router-dom";

import Loader from "./components/loader";
import { setUser } from "./redux/auth/actions";

import Activity from "./scenes/activity";
import Auth from "./scenes/auth";
import Project from "./scenes/project";
import User from "./scenes/user";

import Account from "./scenes/account";

import Drawer from "./components/drawer";
import Header from "./components/header";

import api from "./services/api";

import "./index.css";
import Home from "./scenes/home";

const AppContent = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const user = useSelector((state) => state.Auth.user);

  useEffect(() => {
    if (location.pathname.includes("/auth")) {
      const timeoutId = setTimeout(() => {
        dispatch(setUser(null));
        api.setToken(null);
        localStorage.clear();
      }, 0);
      return () => timeoutId && clearTimeout(timeoutId);
    }
  }, [location, dispatch]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("/user/signin_token");
        if (!res.ok || !res.user) {
          setLoading(false);
          dispatch(setUser(null));
          if (!location.pathname.includes("/auth")) {
            history.replace("/auth");
          }
          return;
        }
        if (res.token) api.setToken(res.token);
        dispatch(setUser(res.user));
      } catch (e) {
        console.log(e);
        dispatch(setUser(null));
        if (!location.pathname.includes("/auth")) {
          history.replace("/auth");
        }
      }
      setLoading(false);
    }
    fetchData();
  }, [dispatch, history, location.pathname]);

  if (loading) return <Loader />;

  if (!user && !location.pathname.includes("/auth")) {
    return <Redirect to="/auth" />;
  }

  return (
    <div className="flex h-screen flex-col">
      {user && <Header />}
      <div className="flex flex-grow overflow-hidden">
        {user && <Drawer />}
        <div className="flex-1 flex flex-col">
          <main className="flex-1 overflow-y-scroll">
            <Switch>
              <Route path="/auth" component={Auth} />
              <RestrictedRoute path="/user" component={User} />
              <RestrictedRoute path="/activity" component={Activity} />
              <RestrictedRoute path="/account" component={Account} />
              <RestrictedRoute path="/project" component={Project} />
              <RestrictedRoute path="/" component={Home} />
            </Switch>
          </main>
        </div>
      </div>
    </div>
  );
};

const RestrictedRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.Auth.user);
  if (!user) return <Redirect to={{ pathname: "/auth" }} />;
  return <Route {...rest} render={(props) => (user ? <Component {...props} /> : <Redirect to={{ pathname: "/auth" }} />)} />;
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
