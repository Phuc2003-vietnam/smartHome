import {} from 'dotenv/config'
import nodemailer from 'nodemailer'
let sendMail=async(data)=>{
            let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: process.env.MAIL_USERNAME, // generated ethereal user
              pass: process.env.MAIL_PASSWORD, // generated ethereal password
            },
          });
          // send mail with defined transport object
              await transporter.sendMail({
                from: '"HCMUT-SPSS" <congviec.mttqq5@gmail.com>', // sender address
                to: data.email, // list of receivers
                subject: data.header, // Subject line
                html: data.content,
                // attachments: data.file
              });
}
export {sendMail}