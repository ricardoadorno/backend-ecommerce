import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const confirmEmail = async (email: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Confirm your email',
    html: 'email confirmed',
  };

  console.log(mailOptions);

  await transporter.sendMail(mailOptions);
};
