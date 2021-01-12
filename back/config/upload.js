const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/images/profile'),
    filename: (req, file, cb) => {
        const split = file.originalname.split('.')
        const ext = split[split.length -1];
        cb(null, `${Date.now()}.${ext}`)
      }
  })

const upload = multer({ storage: storage }).single('fileUpload');

module.exports = {
    upload
};