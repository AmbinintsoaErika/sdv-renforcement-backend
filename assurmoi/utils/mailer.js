require('dotenv').config();

const { createTransport } = require('nodemailer');

const transporter = createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE === 'true' ?? false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PSWD
    }
})

const mail = (to, subject, text, html) => {
    try {
        const result = transporter.sendMail({
            from: process.env.MAIL_FROM,
            to,
            subject,
            text,
            html
        })

        console.log("Mail sent : %s", result.messageId);
        return true;
        
    } catch(error) {
        console.log("Error while sending mail : %s", error);
        return error;
    }
}

const mailLogin = async (user) => {
    try {
        const result = await transporter.sendMail({
            from: process.env.MAIL_FROM,
            to: `${user.firstName} ${user.lastName} <${user.email}>`,
            subject: `Notification de connexion`,
            text: `Bonjour ${user.firstName}, une nouvelle connexion à votre compte a été enregistrée`,
            html: `<h2>Bonjour ${user.firstName} !</h2><br>Une nouvelle connexion à votre compte a été enregistrée`
        })

        console.log("Mail sent : %s", result.messageId);
        return true;
        
    } catch(error) {
        console.log("Error while sending mail : %s", error);
        return error;
    }
}

module.exports = { mail, mailLogin }