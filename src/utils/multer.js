//multer setup
import multer from "multer";
import path from "path";
import fs from "fs";
const __dirname = path.resolve();
// const fpDestination = path.join(__dirname, "public/images");
const fpDestination = "public/images/";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //check if director exist, if not create one
    !fs.existsSync(fpDestination) &&
      fs.mkdirSync(fpDestination, { recursive: true });
    cb(null, fpDestination);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filepath = uniqueSuffix + "-" + file.originalname;
    cb(null, filepath);
  },
});

//const upload = multer({ storage: storage });
// const upload = multer({ dest: "uploads/" });
// end multer setup

//filter to allow images only
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif|avif|webp/;
  const extName = path.extname(file.originalname.toLowerCase());
  const isAllowedExt = allowedFileTypes.test(extName);
  const mimetype = allowedFileTypes.test(file.mimetype);
  if (isAllowedExt && mimetype) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "File extension error. Only jpeg,jpg,png,gif and webp files are allowed.",
      ),
      false,
    );
  }
};
export const upload = multer({
  storage: storage,
  fileFilter,
  limits: { fileSize: 1 * 1024 * 1024 },
}); //1MB
