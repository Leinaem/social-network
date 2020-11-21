import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import routeList from "./page/Routes";
import Error from "./page/Error";
import TopBar from "./components/TopBar/";
import { useSelector } from "react-redux";
import Login from "./page/LoginPage";
import ChatMainPage from "./page/ChatMainPage";

const Main = () => {
  const { isLogged } = useSelector((state) => state.login);

  if (!isLogged) {
    return <Login />;
  }

  return (
    <HashRouter>
      <TopBar />
      <Switch>
        <Route exact path="/" component={ChatMainPage} />
        {routeList.map((item, key) => {
          const ComponentTag = item.component;

          return (
            <Route
              component={ComponentTag}
              exact={item.exact}
              path={item.path}
              key={key}
            />
          );
        })}
        <Route component={Error} />
      </Switch>
    </HashRouter>
  );
};

export default Main;
