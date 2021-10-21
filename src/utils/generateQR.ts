import QRCode from 'qrcode'
import sendQRLink from './sendQRCode'

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
  try {
    await QRCode.toDataURL(text).then(data => {
      
      const myObj = {
        to: ['christian.george360@gmail.com'],
        subject: "QR TEST",
        text: "",
        surveyUrl: `${data}`
      }
      sendQRLink(myObj).catch(err => 
          console.log(err)
    )
    })
  } catch (err) {
    console.error(err)
  }
}

generateQR(url).catch(err => console.log(err));


export default generateQR;