const User = require("../models/auth.model")
const PExpense = require("../models/personalexpanse.model")
const CExpense = require("../models/commonexpanse.model")
exports.getdashboard= async (req,res) => {
    res.render("application/dashboard")
}
exports.getpersonalexpanse = async (req,res) => {
    res.render("application/personalexpanse")
}
exports.getcommonexpanse = async (req,res) => {
    res.render("application/personalexpanse")
}   
exports.postcreateexpanse = async (req, res) => {
    try {
        const { desc, price } = req.body;
        const user = req.user;
        if (!desc || !price) {
            return res.status(400).json({ success: false, message: "Description and Price are required" });
        }

        const newExpense = new PExpense({
            description: desc,
            price,
            userId: user.id,
        });

        await newExpense.save();

        res.status(201).json({ success: true, msg: "Expense saved successfully", data: newExpense });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};
exports.getUserExpenses = async (req, res) => {
    try {
        const expenses = await PExpense.find({ userId: req.user.id });
        res.render("application/viewexpanse", { expenses: expenses });
    } catch (error) {
        res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};
exports.getcommonexpanse = async (req,res) => {
    try {
        const users = await User.find({}, "_id email");
        res.render("application/commonexpanse", { users });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
}

exports.postcommonexpanse = async (req,res) => {
    try {
        const { description, price } = req.body;
        
        let userIds = Object.keys(req.body)
            .filter(key => key.startsWith("userId")) 
            .map(key => req.body[key]); 

        const users = await User.find({ email: { $in: userIds } }, "_id"); 
        const logged_user = req.user.id;
        const userObjectIds = users.map(user => user._id);
        const newExpense = new CExpense({
            description,
            price,
            created_by:logged_user,
            userIds: userObjectIds,
            createdAt: new Date()
        });

        await newExpense.save();
        res.json({ success: true, message: "Expense added successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error saving expense" });
    }
}

exports.dashboard = async (req, res) => {
    try {
        const expenses = await CExpense.find({ collectionStatus: 0 }).populate("userIds", "fname email").sort({ createdAt: -1 });;
        console.log(expenses);
        res.render("application/showcommonexpanse", { expenses });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching expenses");
    }
};
exports.getEditcommonExpense = async (req, res) => {
    try {
        const expense = await CExpense.findById(req.params.id).populate("userIds", "fname email");
        if (!expense) {
            return res.status(404).send("Expense not found");
        }
        
        const users = await User.find({}, "fname email _id"); // Get all users for selection
        res.render("application/editExpense", { expense, users });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching expense");
    }
};
exports.postEditcommonExpense = async (req, res) => {
    try {
        const { description, price } = req.body;
        
        let userIds = Object.keys(req.body)
            .filter(key => key.startsWith("userId"))
            .map(key => req.body[key]);

        const users = await User.find({ email: { $in: userIds } }, "_id");
        const userObjectIds = users.map(user => user._id);

        const expense = await CExpense.findByIdAndUpdate(
            req.params.id,
            {
                description,
                price,
                userIds: userObjectIds
            },
            { new: true }
        );

        if (!expense) {
            return res.status(404).json({ success: false, message: "Expense not found" });
        }

        res.json({ success: true, message: "Expense updated successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error updating expense" });
    }
};
exports.showpersonalcommonexpanse = async (req, res) => {
    try {
        const loggedInUserId = req.user.id;
        const expenses = await CExpense.find({ 
            created_by: loggedInUserId, 
            collectionStatus: 0 
        }).populate("userIds", "fname email");

        console.log(expenses);
        res.render("application/showcommonexpanse", { expenses });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching expenses");
    }
};

exports.logout = (req, res) => {
    res.clearCookie("Expensetoken");
    res.json({ success: true, message: "Logged out successfully!" });
};
