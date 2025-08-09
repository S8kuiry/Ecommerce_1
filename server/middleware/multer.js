import multer from 'multer';
import path from 'path';

// Store files in 'uploads/' temporarily before uploading to Cloudinary
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'uploads/');
  },
  filename: function (req, file, callback) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    callback(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });
export default upload;
