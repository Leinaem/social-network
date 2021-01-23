import React, { useState, useEffect } from "react";
import { socket } from "~/service/socket";
import Avatar from "~/components/core/Avatar";

const ConnectedUserContainer = () => {
  const [userList, setUserList] = useState([]);

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
          <Avatar
            userId={item.userId}
            key={key}
            size="40px"
            src={item.photo}
            alt={`avatar ${item.userName}`}
          />
        );
      })}
    </div>
  );
};

export default ConnectedUserContainer;
