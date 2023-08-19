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

    let emptyFields = [] ;
    if(!date){
        emptyFields.push('date')
    }
    if(!category){
        emptyFields.push('category')
    }
    if(!description){
        emptyFields.push('description')
    }
    if(!amount){
        emptyFields.push('amount')
    }

    if(emptyFields.length > 0){
        return res.status(400).json({ error : 'Please fill all the fields', emptyFields})
    }


    try{
        const expense = await Expense.create({ date, category, description, amount })
        res.status(200).json(expense)
    }catch(error){
        res.status(400).json({ error : error.message })
    }
}

const updateExpense = async (req, res) => {

    const id = req.params.id ;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return  res.status(404).send(`No record with the given ID: ${id}`)
    }
    try{
        const expense = await Expense.findOneAndUpdate({_id: id}, {...req.body})
        res.status(200).json(expense)
    }catch(error) {
        res.status(400).json({error : error.message})
    }
    
}

const deleteExpense = async (req, res) => {

    const { id } = req.params ;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send(`No record with given ID: ${id}`)
    }
    try{
        const expense = await Expense.findOneAndDelete({_id : id}) ;
        res.status(200).json(expense)
    }catch(error){
        res.status(400).json({ error : error.message})
    }
}

module.exports = {
    getExpenses,
    createExpense,
    updateExpense,
    deleteExpense
}