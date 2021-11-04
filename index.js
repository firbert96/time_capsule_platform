const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const app = express();
const morgan = require('morgan');

const env = process.env.NODE_ENV;

if(env!=="test"){
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));

const router = require('./routes/index');
app.use('/api/v1',router);

app.get('/', (req, res) => res.status(200)
    .send({
        status:true,
        data:"Hello World!"
    })
)

module.exports=app