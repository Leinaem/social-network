import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLogOut, isLoading } from "../../redux/Actions/user/LoginActions";

const TopBar = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.login);

  const renderBtn = () => {
    return (
      <Fragment>
        <p>{userData.userName}</p>
        <p>{userData.admin}</p>
        <button
          onClick={() => {
            dispatch(isLoading(true));
            dispatch(setLogOut(false));
          }}
        >
          Déconnection
        </button>
      </Fragment>
    );
  };

  return renderBtn();
};

export default TopBar;
