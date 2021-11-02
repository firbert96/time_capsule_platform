const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const app = express();
const morgan = require('morgan');

const Sequelize = require('sequelize')

const env = process.env.NODE_ENV;
const dbConnection ={
    development:process.env.DB_CONNECTION,
    test:process.env.DB_CONNECTION_TEST,
    production:process.env.DB_CONNECTION
};

const db = new Sequelize(dbConnection, {logging: false}) 

if(env!=="test"){
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));

app.get('/', (req, res) => res.status(200)
    .send({
        status:true,
        data:"Hello World!"
    })
)

module.exports=app