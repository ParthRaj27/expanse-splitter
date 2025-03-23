const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser")
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json())
const multer = require("multer");
const fetchuser = require("../middleware/auth.middleware");
const { getdashboard } = require("../controller/application.controller");
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
router.get("/dashboard",fetchuser,getdashboard);

module.exports = router;