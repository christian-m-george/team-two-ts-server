"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
// async..await is not allowed in global scope, must use a wrapper
function sendQRLink(QRUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "teamtwoagile@gmail.com",
                pass: "Teamtwoagile1!", // generated ethereal password
            },
        });
        var solution = QRUrl.QRUrl.split("base64,")[1];
        // console.log("TYPE: " + typeof QRUrl.QRUrl);
        // console.log("THIS IS URL" + QRUrl.QRUrl);
        console.log(`<img src="${Buffer.from(solution, 'base64').toString()}"`);
        // send mail with defined transport object
        let info = yield transporter.sendMail({
            from: '"Questioneer" <survey@questioneer.com>',
            to: ["christian.george360@gmail.com"],
            subject: "Here is a sharable QR Code for your survey",
            html: `<html><b>You've been invited to take a survey <img src="${solution}" alt='qrcode' /></b></html>`, // html body
        });
        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
}
exports.default = sendQRLink;
