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

module.exports = {
  getHistory
};