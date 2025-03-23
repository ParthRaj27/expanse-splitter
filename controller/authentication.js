const User = require("../models/auth.model");
var jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRETS;
const bcrypt = require("bcryptjs");
// signup controller
exports.getsignup = (req, res) => {
    res.render("authentication/signup");
}
exports.postsignup = async (req, res) => {
    try {
        const { fname, lname, email, password, cpassword } = req.body
        // if(!fullname || !email || !password || !phonenumber || !role){
        //     return res.status(400).json({
        //         message :"something is missing",
        //         success: false
        //     })
        // };
        console.log(req.body)
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: "User with same email is already exist",
                success: false
            })
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        try {
            const newUser = await User.create({
                fname: fname,
                lname: lname,
                email: email,
                password: hashedpassword
            });
            console.log(newUser)
            if (newUser) {
                return res.status(201).json({
                    msg: "User registered successfully",
                    success: true
                });
            }
        } catch (error) {
            console.error("Error creating user: ", error.message); // log any error
        }

    } catch (error) {
        console.log(error)
    }
}
// login contolller
exports.postlogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                msg: "Incorrect email, user doesn't exist",
                success: false
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect password",
                success: false
            });
        }

        const data = {
            fname: user.fname, // Use user object instead of result[0]
            lname: user.lname,
            email: user.email,
        };
        const authtoken = jwt.sign(data, JWT_SECRET, { expiresIn: '10m' });

        res.cookie("Expensetoken", authtoken, {
            httpOnly: true,
            secure: false, // Set to true in production (use HTTPS)
            maxAge: 60 * 60 * 1000, // 1 hour
        });

        res.send({ success: true, msg: "Login successful, you are on the home screen" });

    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};
exports.getlogin = (req, res) => {
    res.render("authentication/login");
}