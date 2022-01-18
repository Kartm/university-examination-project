// import {ParticipantInterface} from "../api/participant/interfaces/participant.interface";
//
// const nodemailer = require('nodemailer');
//
// function sendMail(adresses: string) {
//
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'youremail@gmail.com',
//             pass: 'yourpassword'
//         }
//     });
//
//     const mailOptions = {
//         from: 'youremail@gmail.com',
//         to: adresses,
//         subject: 'Sending Email using Node.js',
//         text: 'That was easy!'
//     };
//
//     transporter.sendMail(mailOptions, function(error, info){
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('Email sent: ' + info.response);
//         }
//     });
// }
//
// const postTest = (test_id: string) => {
//     const adresses = ""
//     const participants : ParticipantInterface[] = getParticipantsFromDatabase(test_id)
//      participants.forEach(participant => {
//             adresses.concat(`, ${participant.email}`)
//      })
//
//
//     sendMail(adresses);
//
// }
//
