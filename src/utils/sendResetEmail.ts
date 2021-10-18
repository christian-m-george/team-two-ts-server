import nodemailer from 'nodemailer';

interface ResetPassword {
  to: string[],
  subject: string,
  text: string,
  html: string,
  resetUrl: string
}

// async..await is not allowed in global scope, must use a wrapper
async function sendResetEmail(resetPassword: ResetPassword) {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "teamtwoagile@gmail.com", // generated ethereal user
      pass: "Teamtwoagile1!", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Questioneer" <passwordhelp@questioneer.com>', // sender address
    to: resetPassword.to, // list of receivers
    subject: `${resetPassword.subject}`, // Subject line
    text: `${resetPassword.text}`, // plain text body
    html: `<html><b>Reset your password <a href='${resetPassword.resetUrl}'>Click here to reset your password</a></b></html>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}


const fakeUser = {
  to: ["christian.george360@gmail.com"],
  subject: "test email man",
  text: "how bout it did it work?",
  html: "",
  resetUrl: "string"
}

export default sendResetEmail;