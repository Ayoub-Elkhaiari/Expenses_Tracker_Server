const Expense = require('../models/expensesModel')

const mongoose = require('mongoose') ;



const getExpenses = async (req, res) => {

    try{
        const expenses = await Expense.find({}).sort({ createdAt : -1 }) ;
        res.status(200).json(expenses) ;
    }catch(error) {
        res.status(400).json({ error : error.message})
    }
}

const createExpense = async (req, res) => {
    const { date, category, description, amount } = req.body ;
    try{
        const expense = await Expense.create({ date, category, description, amount })
        res.status(200).json(expense)
    }catch(error){
        res.status(400).json({ error : error.message })
    }
}

module.exports = {
    getExpenses,
    createExpense
}