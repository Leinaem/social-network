import ChatMainPage from "./ChatMainPage";
import Colors from "./Colors";

const routeList = [
  {
    path: "/colors",
    exact: true,
    component: Colors,
  },
  {
    path: "/",
    exact: true,
    component: ChatMainPage,
  },
];

export default routeList;
