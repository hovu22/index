const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'vuho7248@gmail.com',
      pass: 'zmwjuourmyhfraef'
    }
  });

module.exports = { transporter };