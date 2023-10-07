require('dotenv').config() ;
const express = require('express') ;
const mongoose = require('mongoose')
const cors = require('cors') ;

const expensesRoutes = require('./routes/expensesRoutes')
const usersRoutes = require('./routes/usersRoutes') ;

const app = express() ;

app.use(cors());
app.use(express.json()) ; // receive req


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });


app.use('/api/expenses', expensesRoutes) ;
app.use('/api/users', usersRoutes) ;




const connectToDatabase =  async () => {

    try {
        await mongoose.connect(process.env.DB_CONNECTION) ;
        app.listen(process.env.PORT, ()=> console.log(`Connected at port: ${process.env.PORT}`))
    } catch (error) {
        console.log(error.message) ;
        
    }
}

connectToDatabase() ;



