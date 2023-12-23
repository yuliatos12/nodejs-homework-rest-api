const nodemailer = require("nodemailer");

const { META_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "yaremenko0212@meta.ua",
    pass: META_PASSWORD,
  },
});

module.exports = transporter;