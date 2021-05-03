import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import { socket } from "../../../service/socket";
import Avatar from "../../../components/core/Avatar";
import Popover from "@material-ui/core/Popover";

interface userData {
  userId: string;
  userName: string;
  admin: number;
  createdAt?: string;
  photo: string;
}

const ConnectedUser = () => {
  const [userList, setUserList] = useState<userData[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [openedPopoverId, setOpenedPopoverId] = useState(null);

  const handleClick = (t: HTMLDivElement | null) => {
    setAnchorEl(t);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    socket.on("newUser", (newUser: userData) => {
      setUserList((userList) => userList.concat(newUser));
    });
    socket.on("userLeft", (user: userData) => {
      setUserList(
        userList.filter((item: userData) => item.userId !== user.userId)
      );
    });

    return () => {
      socket.off("newUser");
      socket.off("userLeft");
    };
  }, [userList]);

  return (
    <div id="connected-user">
      {userList.map((item: userData, key) => {
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
