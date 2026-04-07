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

export const sendUserConfirmationMail = async({name , email, queryId })=>{
const mailOptions = {
    from : `"Spark Consulting"<${process.env.EMAIL_USER}>`,
    to : email,
    subject : `We received your query - #${queryId}`,
    html : `
    <h2>Hi ${name},</h2>
    
    <p>Thank you for reaching out to us! We have received your query successfully.</p>
    
    <p><strong>Your Query Number: #${queryId}</strong></p>
    
    <p>Our team will review your query and get back to you soon. You can use your query number to track your inquiry.</p>
    
    <p>If you have any urgent matters, feel free to contact us directly.</p>
    
    <p>Regards,<br/>
    <strong>Spark Consulting Team</strong></p>
    `,
};
const info = await transporter.sendMail(mailOptions);
console.log("User confirmation mail sent :",info.messageId);
return info;
}

export const sendmail = async({name , email, contact, message, queryId })=>{
    await sendAdminMail({name, email, contact, message});
    await sendUserConfirmationMail({name, email, queryId});
}
