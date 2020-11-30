import React, { useEffect } from "react";
import { socket } from './../../service/socket';
import { useSelector } from "react-redux";
import ChatMainPage from "./ChatMainPage";

const ChatMainPageContainer = () => {
  const { userData } = useSelector((state) => state.login);
  console.log('chat main Container page render')


  /**
   * Socket Connection
   */
  useEffect(() => {
    const { userName, admin } = userData;

    socket.emit("login", {
      userName,
      admin
    });

    socket.on('newUser', (newUser) => {
      console.log('user inc')
      console.log(newUser);
      console.log(newUser.userName);
      const userListContainer = document.getElementById('connected-user');
      const newAvatar = document.createElement("img");
      newAvatar.setAttribute("src", newUser.avatar)
      newAvatar.setAttribute("id", newUser.id)
      newAvatar.setAttribute("user-name", newUser.userName)
      userListContainer.appendChild(newAvatar)
    });

    socket.on('userLeft', (user) => {
      console.log('user left')
      console.log(user.userName)
      const userImg = document.getElementById(user.id)
      if (userImg) {
        userImg.remove()
      }
    })

    return () => {
      socket.off('newUser');
      socket.off('userLeft');
   };
  }, [userData]);

  return <ChatMainPage />;
};

export default React.memo(ChatMainPageContainer);
