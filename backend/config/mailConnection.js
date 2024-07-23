const nodemailer = require("nodemailer");
const logger = require("../logging/logger");
require('dotenv/config')

const mail_user=process.env.MAIL_USER
const mail_password=process.env.MAIL_PASSWORD

console.log(mail_user);
console.log(mail_password);

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: mail_user,
        pass: mail_password,
    },
});

const verifyTransporter=()=>{
    return new Promise((resolve,reject)=>{
        transporter.verify((error,success)=>{
            if(error){
                logger.error(error)
                reject(error)
            }else{
                console.log("Server is ready to take our messages");
                resolve(transporter)  
            }
        })
    })
}

const getTransporter=async ()=>{
    try {
        return await verifyTransporter()
    } catch (error) {
        console.log(error);
    }
}

module.exports=getTransporter

// // verify connection configuration
// transporter.verify(async (error, success)=> {
//     if (error) {
//         logger.error(error)
//     } else {
//         console.log("Server is ready to take our messages");

//         return transporter

//         // const info=await transporter.sendMail({
//         //     from: 'info@ethereal.email', // sender address
//         //     to: "officialct24@gmail.com", // list of receivers
//         //     subject: "Hello ✔", // Subject line
//         //     text: "Hello world?", // plain text body
//         //     html: "<b>Hello world?</b>", // html body
//         // });

//         // console.log("Message sent: %s", info.accepted);
//     }
// });

