import multer from 'multer';

export const upload = multer({
  storage:multer.memoryStorage(),
  limits: {fileSize: 1_000_000},
  fileFilter:(_, file, cb) => {
    if(!file.originalname.endsWith('.md')) {
      return cb(new Error('only .md files allowed'));
    }
    cb(null, true);
  }
})
