const transporter = require("./nodemailerConfig");

const sendEmail = async (data) => {
  const email = { from: "yaremenko0212@meta.ua", ...data };
  await transporter.sendMail(email);
  return true;
};

module.exports = sendEmail;