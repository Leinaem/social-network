import React from "react";
import { formatDate } from "~/libs/Tools";
import classNames from "classnames";

const Message = (props) => {
  const { data, author } = props;

  return (
    <div
      className={classNames("messageLine", {
        tRight: author === "self",
      })}
    >
      <div className={classNames("messageContainer", `${author}`)}>
        <p>
          <span className="messageUserName">{data.userName}</span>
          <span> : </span>
          <span className="messageInfo">{formatDate(data.createdAt)}</span>
        </p>
        <p className="messageContent">{data.message}</p>
      </div>
    </div>
  );
};

export default Message;
