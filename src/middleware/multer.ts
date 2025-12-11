import multer from "multer";
import path from "path";

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, "uploads/images");
    } else if (file.mimetype.startsWith("video")) {
      cb(null, "uploads/videos");
    } else {
      cb(new Error("Invalid file type"), "");
    }
  },

  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

// File filter
const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith("image") || file.mimetype.startsWith("video")) {
    cb(null, true);
  } else {
    cb(new Error("Only image and video files are allowed!"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
});
