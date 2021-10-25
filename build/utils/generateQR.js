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
const qrcode_1 = __importDefault(require("qrcode"));
const sendQRLink_1 = __importDefault(require("./sendQRLink"));
// With promises
// QRCode.toDataURL('I am a pony!')
//   .then(url => {
//     console.log(url)
//   })
//   .catch(err => {
//     console.error(err)
//   })
let url = 'http://localhost3000:/survey/';
// With async/await
const generateQR = (text) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield qrcode_1.default.toDataURL(text).then(data => data).catch(err => err);
    return response;
});
generateQR(url).then(data => (0, sendQRLink_1.default)({ QRUrl: `${data}` }));
exports.default = generateQR;
