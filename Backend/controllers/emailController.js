const nodemailer = require('nodemailer');
require('dotenv').config();                 //dotenv' read krta h environment variables from '.env' file

const sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;
  const transporter = nodemailer.createTransport({            //Creating a nodemailer transporter with Gmail service
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'Homyz <' + process.env.EMAIL_USER + '>',
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent!');
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

module.exports = {sendEmail}