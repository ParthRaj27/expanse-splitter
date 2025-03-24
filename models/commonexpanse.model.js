const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
    description: { type: String, required: true },
    price: { type: Number, required: true },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    userIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    collectionStatus: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});


const CExpense = mongoose.model('CExpense', ExpenseSchema);
module.exports = CExpense;