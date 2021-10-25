import QRCode from 'qrcode'
import sendQRLink from './sendQRLink'

// With promises
// QRCode.toDataURL('I am a pony!')
//   .then(url => {
//     console.log(url)
//   })
//   .catch(err => {
//     console.error(err)
//   })


let url = 'http://localhost3000:/survey/'
// With async/await
const generateQR = async (text: string) => {
    const response = await QRCode.toDataURL(text).then(data => data).catch(err => err)
    return response;
}

generateQR(url).then(data => sendQRLink({QRUrl: `${data}`}));


export default generateQR;