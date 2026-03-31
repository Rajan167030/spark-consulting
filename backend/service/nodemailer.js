import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config();
// Gmail SMTP transporter used to send emails from server (queries from users to admin)
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendAdminMail = async({name , email, contact, message })=>{
const mailOptions = {
    from : `"Sprak consulting"<${process.env.EMAIL_USER}>`,
    to : process.env.ADMIN_EMAIL,
    replyTo : email,
    subject : `New Query from ${name}`,
    text : `
    Name : ${name}
    Email : ${email}
    Contact : ${contact}
    Message : ${message}
    `,
};
const info = await transporter.sendMail(mailOptions);
console.log("Admin mail sent :",info.messageId);
return info;
}

export const sendUserConfirmationMail = async({name , email })=>{
const mailOptions = {
    from : `"Sprak consulting"<${process.env.EMAIL_USER}>`,
    to : email,
    subject : `We received your query`,
    text : `
    Hi ${name},

    We have received your query successfully.

    Our team will review it and get back to you soon.

    Regards,
    Spark Consulting
    `,
};
const info = await transporter.sendMail(mailOptions);
console.log("User confirmation mail sent :",info.messageId);
return info;
}

export const sendmail = async({name , email, contact, message })=>{
    await sendAdminMail({name, email, contact, message});
    await sendUserConfirmationMail({name, email});
}
