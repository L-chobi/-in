const path = require("path");
const multer = require("multer");

const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

require("dotenv").config();

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "ap-northeast-2",
});

const multerImages = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "wetube22/ch",
  }),
});

const uploadImagesS3 = multerImages.single("img");

const isLoggedIn = (req, res, next) => {
  const { session } = req;

  if (!session.kakao) {
    res.status(401).redirect("/login");
  }

  next();
};

const setLoggedInStatus = (req, res, next) => {
  const { session } = req;

  if (!session.kakao) {
    req.isLoggedIn = false;
  } else {
    req.isLoggedIn = true;
  }

  next();
};

const uploadImages = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "src/uploads/imgs");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
});

module.exports = {
  isLoggedIn,
  setLoggedInStatus,
  // uploadImages,
  uploadImagesS3,
  s3,
};
