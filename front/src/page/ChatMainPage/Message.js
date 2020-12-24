import React from 'react';

const Message = (props) => {
  const { data } = props;

  return (
    <div key={data._id}>
      <p><span>{data.name} : </span>{data.message}</p>      
    </div>
  );
};

export default Message;
