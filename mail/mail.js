const mailer = require('nodemailer');

module.exports = { 
  sendEmail(to,subject,message){
    const transporter = mailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
    });
    to = 'firbert96@gmail.com';
    //sending the email
    transporter.sendMail({
        from: '"Firbert" <firbert96@gmail.com>',
        to: '"You there" <'+to+'>',
        subject: subject,
        html: message
    })
    .then(response => {
      console.log(response)
    })
    .catch(error => {console.log(error)});
  }

};
