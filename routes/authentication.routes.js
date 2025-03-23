const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser")
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json())
const { getsignup, getlogin, postsignup, postlogin } = require("../controller/authentication");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/uploads/");
    },
    filename: (req, file, cb) => {
      let timestamp = Date.now();
      let pathname = file.originalname;
      cb(null, `${timestamp}_${pathname}`);
    },
  });
  const upload = multer({ storage: storage });
router.get("/", getsignup);
router.get("/login", getlogin);
router.post("/signup",upload.none(),postsignup)
router.post("/login",upload.none(),postlogin)

module.exports = router;