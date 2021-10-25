import nodemailer from 'nodemailer';

interface QRLink {
  // to: string[],
  QRUrl: string
}

// async..await is not allowed in global scope, must use a wrapper
async function sendQRLink(QRUrl: QRLink) {

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

  var solution = QRUrl.QRUrl.split("base64,")[1];

  // console.log("TYPE: " + typeof QRUrl.QRUrl);
  // console.log("THIS IS URL" + QRUrl.QRUrl);
  console.log(`<img src="${Buffer.from(solution, 'base64').toString()}"`);

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Questioneer" <survey@questioneer.com>', // sender address
    to: ["christian.george360@gmail.com"], // list of receivers
    subject: "Here is a sharable QR Code for your survey", // Subject line
    html: `<html><b>You've been invited to take a survey <img src="${solution}" alt='qrcode' /></b></html>`, // html body
  });



  console.log("Message sent: %s", info.messageId);

  // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

export default sendQRLink;