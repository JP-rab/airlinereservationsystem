import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken';
export const sendVerificationCode = async (email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      const code = Math.floor(100000 + Math.random() * 900000);
      await transporter.sendMail({
          from: "tcu.airlines",
          to: `${email}`,
          subject: "Verification Code",
          text: `Your Verification Code is ${code}`,
      });
      
      const verificationCode = jwt.sign({code}, process.env.JWT_SECRET, {
        expiresIn: 30000
      });

      return verificationCode;
}

export const sendEmail = async (email, data) => {
    const base64Encoded = Buffer.from(JSON.stringify({id: data.id, seat: data.seatNumber})).toString('base64');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.sendMail({
      from: "tcu.airlines@example.com", 
      to: `${email}`, 
      subject: "Flight ticket",
      html: `
          <p>Click the link below to view your flight ticket:</p>
          <a href="https://airlinereservationsystem.onrender.com/tcu-airlines/ticket?data=${base64Encoded}" style="text-decoration: underline;">
              https://airlinereservationsystem.onrender.com/tcu-airlines
          </a>
      `
  });
}