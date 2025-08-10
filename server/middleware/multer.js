import multer from 'multer';

// Store files in memory (buffer) instead of disk
const storage = multer.memoryStorage();

const upload = multer({ storage });
export default upload;
