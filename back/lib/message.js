const DbMessage = require("../model/Message");

const addMessage = async (data) => {
    const { userName, message } = data;
    const newMessage = new DbMessage({
      name: userName,
      message
    });
  
    await newMessage.save();
}


module.exports = {
    addMessage
};
