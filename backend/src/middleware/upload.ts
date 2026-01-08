import multer from 'multer';

const upload = multer({
  storage:multer.memoryStorage(),
  limits: {fileSize: 10_000_000}
});

export const uploadPostAssets = upload.fields([
  {name: "markdown", maxCount: 1},
  {name: "images", maxCount: 10}
]);
