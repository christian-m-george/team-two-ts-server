import nodemailer from 'nodemailer';

interface QRLink {
  to: string[],
  subject: string,
  text: string,
  surveyUrl: string
}

// async..await is not allowed in global scope, must use a wrapper
async function sendQRLink(surveyGroup: QRLink) {

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
    from: '"Questioneer" <survey@questioneer.com>', // sender address
    to: surveyGroup.to, // list of receivers
    subject: `${surveyGroup.subject}`, // Subject line
    text: `${surveyGroup.text}`, // plain text body
    html: `<html><b>You've been invited to take a survey <img src='${surveyGroup.surveyUrl}' alt='qrcode' /></b></html>`, // html body
  });



  console.log("Message sent: %s", info.messageId);

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

export default sendQRLink;