const schedule = require('node-schedule');
const axios = require('axios');
const mail = require('../mail/mail');
const url = process.env.url || 'http://localhost:'
const moment = require('moment')
const port = process.env.PORT || 1234

console.log('sendEmail');
schedule.scheduleJob('*/1 * * * *', async function(){
    console.log('scheduleJob');
    try {
        const response = await axios.get(url+port+'/api/v1/time_capsule_message/list_all');
        console.log(response);
        response.data.forEach(element => {
            const date = moment(element.release_time).toDate()
            schedule.scheduleJob(date, function(){
                const to = element.users.email
                const subject = element.subject
                const message = element.message
                mail.sendEmail(to,subject,message)
            });
            console.log(element);
        });
        console.log('Success send email');
    }
    catch (error) {
        console.log(error);
    }
})

module.exports = schedule;