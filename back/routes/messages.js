const DbMessage = require("../model/Message");

const getHistory = async (req, res) => {
  await DbMessage.find({}, (err, history) => {
      if (err) {
          return res.status(404).json();
      }

      if (!history) {

      } else {
        return res.json({
          history
        })
      }
  })
}

const addMessage = (req, res) => {
  const { userName, message } = req.body;
    const newMessage = new DbMessage({
      name: userName,
      message
    });
  
    console.log(req.body)
    newMessage.save({}, (err) => {
      if(err) {
        return res.status(520).json({err});
      }

      return res.status(200).json({});
    });
  }

module.exports = {
  getHistory,
  addMessage
};