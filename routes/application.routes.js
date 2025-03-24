const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser")
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json())
const multer = require("multer");
const fetchuser = require("../middleware/auth.middleware");
const { dashboard, getpersonalexpanse, postcreateexpanse, getUserExpenses, getcommonexpanse, postcommonexpanse, showcommonexpanse, postEditcommonExpense, getEditcommonExpense, showpersonalcommonexpanse, logout } = require("../controller/application.controller");
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
router.get("/dashboard",fetchuser,dashboard);
router.get("/personal-expanse",fetchuser,getpersonalexpanse)
router.post("/expanse-create",fetchuser,upload.none(),postcreateexpanse)
router.get("/expenses", fetchuser, getUserExpenses); 
router.get("/common-expense",fetchuser,getcommonexpanse)
router.post("/common-expanse",fetchuser,upload.none(),postcommonexpanse)
router.get("/edit-expense/:id", fetchuser,getEditcommonExpense);
router.post("/edit-expense/:id", fetchuser,postEditcommonExpense);
router.get("/show-your-common-expanse",fetchuser,showpersonalcommonexpanse)
router.post("/logout",fetchuser,upload.none(), logout);

module.exports = router;