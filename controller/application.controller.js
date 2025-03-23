const PExpense = require("../models/personalexpanse.model")
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
        console.log(user)
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