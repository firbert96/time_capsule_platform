const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const app = express();
const morgan = require('morgan');
const cors = require('cors')
const env = process.env.NODE_ENV;
const port = process.env.PORT || 1234
const scheduler = require('./scheduler/index');
const router = require('./routes/index');

app.use(cors())
if(env!=="test"){
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));

app.use('/api/v1',router.User);
app.use('/api/v1',router.Time_Capsule_Message);

app.get('/', (req, res) => res.status(200)
    .send({
        status:true,
        data:"Hello World!"
    })
)

app.listen(port, () => {
    console.log(`Server started at ${Date()}`);
    console.log(`Example app listening on port ${port}!`);
})

scheduler.sendEmail;

module.exports=app