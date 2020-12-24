import React, { Component } from 'react';
import Message from './Message';

const ChatBox = (props) => {
  const { history } = props;

  /**
   * Display chat message
   *
   * @param {*} item 
   * @return {Component} Message component
   */
  const displayMessage = (item) => {
    return <Message data={item} key={item._id}/>
  }

  return (
    <div id="chatBox">
      {history.map((item) => displayMessage(item))}
    </div>
  );
};

export default ChatBox;