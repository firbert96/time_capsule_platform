const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const app = express();
const morgan = require('morgan');
const cors = require('cors')
// const fileUpload = require('express-fileupload');
// const cron = require('node-cron')
// const axios = require('axios')
// const mail = require('./mail/mail')
const env = process.env.NODE_ENV;
const port = process.env.PORT || 1234
// const url = process.env.url || 'http://localhost:'


app.use(cors())
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

app.listen(port, () => {
    console.log(`Server started at ${Date()}`);
    console.log(`Example app listening on port ${port}!`);
})

// axios.get(url+port+'/api/v1/time_capsule_message/list_by_users_id')
//     .then(response => {
//     console.log(response.data);
//     })
//     .catch(err => console.error(err))

// Cron Job
// cron.schedule('* * * * *', () => {
//     console.log("Task is running every " + new Date())
//     mail.sendEmail("<h1>Success send msg</h1>")
// });
// End Cron Job

module.exports=app