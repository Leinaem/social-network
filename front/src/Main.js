import React, { useEffect } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./components/core/Loading";
import { fetchCurrentUser } from "./redux/lib";
import TopBar from "./components/TopBar/";
import routeList from "./page/Routes";
import Login from "./page/LoginPage";
import Error from "./page/Error";

const Main = () => {
  const { isLogged, isLoading } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      dispatch(fetchCurrentUser(userId));
    }
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  if (!isLogged) {
    return <Login />;
  }

  return (
    <HashRouter>
      <TopBar />
      <Switch>
        {routeList.map((item, key) => {
          return (
            <Route
              component={item.component}
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

export default React.memo(Main);
