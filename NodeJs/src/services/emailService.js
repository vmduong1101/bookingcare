require('dotenv').config();
import { reject } from 'lodash';
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD
        }
    })

    let info = await transporter.sendMail({
        from: 'Kim Anh 👻 "<anhb1807614@student.ctu.edu.vn>"',
        to: dataSend.reciverEmail,
        subject: "Thông tin đặt lịch khám bệnh",
        html: getBodyHTMLEmail(dataSend)
    })
}

let getBodyHTMLEmail = (dataSend) => {
    let result = ''
    if(dataSend.language === 'vi') {
        result = 
        `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên MiuCare</p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

        <p>Nếu các thông tin trên là đúng sự thật, vui lòng chọn vào đường link bên dưới
            để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.
        </p>
        <div>
            <a href=${dataSend.redirectLink} target="_blank">Click vào đây!</a>
        </div>

        <div>Xin chân thành cảm ơn</div>
        `
    }
    if(dataSend.language === 'en') {
        result = 
        `
        <h3>Dear ${dataSend.patientName}!</h3>
        <p>You received this email because you booked an online medical appointment.</p>
        <p>Information to schedule an appointment</p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>

        <p>If the above information is true, please click on the link below to receive the 
        appointment
        </p>
        <div>
            <a href=${dataSend.redirectLink} target="_blank">Click here!</a>
        </div>

        <div>Sincerely thank!</div>
        `
    }
    return result
}

let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = ''
    if(dataSend.language === 'vi') {
        result = 
            `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên MiuCare</p>
        <p>Thông tin đơn thuốc/hóa đơn được gửi trong file đính kèm.</p>

        <div>Xin chân thành cảm ơn!</div>
        `
    }

    if(dataSend.language === 'en') {
        result = 
            `
        <h3>Dear ${dataSend.patientName}!</h3>
        <p>You received this email because you booked an online medical appointment MiuCare</p>
        <p>
        Prescription/invoice information is sent in the attachment.</p>

        <div>Sincerely!</div>
        `
    }
    return result;
}

let sendAttachment = async (dataSend) => {
    return new Promise(async(resolve, reject) => {
        try {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                user: process.env.EMAIL_APP,
                pass: process.env.EMAIL_APP_PASSWORD
            },
        });

        let info = await transporter.sendMail({
            from: 'Kim Anh 👻 "<anhb1807614@student.ctu.edu.vn>"',
            to: dataSend.email,
            subject: "Thông tin đặt lịch khám bệnh",
            html: getBodyHTMLEmailRemedy(dataSend),
            attachments: [
                {
                    filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
                    content: dataSend.imgBase64.split("base64,")[1],
                    encoding: 'base64'
                }
            ]
        })

        resolve(true)

        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment: sendAttachment
}