var jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRETS;


const fetchuser = (req, res, next) => {
  const token = req.cookies.Expensetoken;
  if (!token) {
    return res.redirect('/login')
    // return res.send({
    //   msg: "invalid token",
    //   success: false
    // });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.redirect('/login')
      } else {
        req.user = decoded;
        next();
      }
    });
  } catch (error) {
    // res.status(401).send({ error: "please authenticate with valid token" });
    return res.redirect('/login')
  }
};
module.exports = fetchuser;
