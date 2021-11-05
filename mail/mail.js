const mailer = require('nodemailer');

module.exports = { 
  sendEmail(message){
    const transporter = mailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
    });
    //sending the email
    transporter.sendMail({
        from: '"Firbert" <firbert96@gmail.com>',
        to: '"You there" <firbert96@gmail.com>',
        subject: 'Scheduled Email',
        html: message
    })
    .then(response => {
      console.log("Email sent on " + new Date()) 
      console.log(response)
    })
    .catch(error => {console.log(error)});
  }

};
