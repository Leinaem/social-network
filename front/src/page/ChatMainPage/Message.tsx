import React from "react";
import { formatDate } from "../../libs/Tools";
import classNames from "classnames";

export interface MessageDataProps {
  createdAt: string;
  edited: Boolean;
  message: string;
  userId: string;
  userName: string;
  // __v: Number;
  _id: string;
}

export interface MessageProps {
  data: MessageDataProps;
  author: string;
}

const Message: React.FC<MessageProps> = (props) => {
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
