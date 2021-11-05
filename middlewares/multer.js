const multer = require('multer')
const attachment = multer().single('attachment')
module.exports = {attachment}
