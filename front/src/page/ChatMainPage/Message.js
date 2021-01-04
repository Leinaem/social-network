import React from "react";
import { formatDate } from "./../../libs/Tools";

const Message = (props) => {
  const { data } = props;

  return (
    <div>
      <p>{formatDate(data.createdAt)}</p>
      <p>
        <span>{data.userName} : </span>
        {data.message}
      </p>
    </div>
  );
};

export default Message;
