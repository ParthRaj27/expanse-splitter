// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const { Schema } = mongoose;

const personalExpenseSchema = new Schema({
    description: { type: String, required: true },
    price: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const PExpense = mongoose.model('PExpense', personalExpenseSchema);
module.exports = PExpense;
