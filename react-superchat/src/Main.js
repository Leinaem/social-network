import React, { useEffect } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import routeList from "./page/Routes";
import Error from "./page/Error";
import TopBar from "./components/TopBar/";
import { useSelector } from "react-redux";
import Login from "./page/LoginPage";
import { fetchCurrentUser } from "./redux/Actions/user/LoginActions";
import { useDispatch } from "react-redux";
import Loading from "./components/core/Loading";

const Main = () => {
  console.log('render MAIN')
  const { isLogged, isLoading } = useSelector((state) => state.login);
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
