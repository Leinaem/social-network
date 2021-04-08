import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import { socket } from "~/service/socket";
import Avatar from "~/components/core/Avatar";
import Popover from "@material-ui/core/Popover";

const ConnectedUser = () => {
  const [userList, setUserList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openedPopoverId, setOpenedPopoverId] = useState(null);

  const handleClick = (t) => {
    setAnchorEl(t);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    socket.on("newUser", (newUser) => {
      setUserList((userList) => userList.concat(newUser));
    });
    socket.on("userLeft", (user) => {
      setUserList(userList.filter((item) => item.userId !== user.userId));
    });

    return () => {
      socket.off("newUser");
      socket.off("userLeft");
    };
  }, [userList]);

  return (
    <div id="connected-user">
      {userList.map((item, key) => {
        return (
          <div key={key}>
            <Avatar
              size="40px"
              src={item.photo}
              userId={item.userId}
              handleClick={handleClick}
              alt={`avatar ${item.userName}`}
              setOpenedPopoverId={setOpenedPopoverId}
            />
            <Popover
              anchorEl={anchorEl}
              onClose={handleClose}
              open={Boolean(anchorEl) && openedPopoverId === item.userId}
              anchorOrigin={{
                vertical: "center",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "center",
                horizontal: "right",
              }}
            >
              <UserCard photo={item.photo} userName={item.userName} />
            </Popover>
          </div>
        );
      })}
    </div>
  );
};

export default ConnectedUser;
