const multer = require('multer');
const path = require('path');

// Chọn nơi lưu trữ cho các tệp được tải lên
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../../public'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
    const fileUrl = `http://localhost:4000/public/${filename}`;
    cb(null, filename);
    file.url = fileUrl;
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
