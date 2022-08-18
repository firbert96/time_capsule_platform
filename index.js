const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const app = express();
const morgan = require('morgan');
const cors = require('cors')
const schedule = require('node-schedule');
const axios = require('axios')
const mail = require('./mail/mail')
const env = process.env.NODE_ENV;
const port = process.env.PORT || 1234
const url = process.env.url || 'http://localhost:'
const moment = require('moment')

app.use(cors())
if(env!=="test"){
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));

const router = require('./routes/index');
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

// Cron Job
schedule.scheduleJob('*/1 * * * *', function(){
    axios.get(url+port+'/api/v1/time_capsule_message/list_all')
    .then(response => {
        response.data.forEach(element => {
            let date = moment(element.release_time).toDate()
            schedule.scheduleJob(date, function(){
                let to = element.users.email
                let subject = element.subject
                let message = element.message
                mail.sendEmail(to,subject,message)
            });
        });
    })
    .catch(err => console.log(err))
})
// End Cron Job

module.exports=app