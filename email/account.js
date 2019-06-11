const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  const msg = {
    to: `${email}`,
    from: 'zencles75@gmail.com',
    subject: 'Sending with SendGrid is Fun',
    text: `Welcome to the app, ${name}. Let me now how you get along with the app`,
    html: `<strong>Welcome to the app, ${name}.</strong>`
  };
  sgMail.send(msg);
};
const sendQuitEmail = (email, name) => {
  const msg = {
    to: `${email}`,
    from: 'zencles75@gmail.com',
    subject: 'Sending with SendGrid is Fun',
    text: `Sorry to see you leave, ${name}. Let me now why you get away from the app`
  };
  sgMail.send(msg);
};
const sendResetPassword = (email, name, token) => {
  const msg = {
    to: `${email}`,
    from: 'zencles75@gmail.com',
    subject: 'Reset your Quelquesminutes password',
    html: `

<h2>Hi ${name},</h2>
<p>Forgot your password? No worries.</p>

<p>You can reset your password immediately by <a href="http://localhost:3090/reset-password/${token}">clicking here</a> or pasting the following link in your browser:</p>
<p>http://localhost:3090/reset-password/${token}</p>

<p>If you run into any other problems, drop us a line at help@quelquesminutes.com.</p>

Cheers,
    `
  };
  sgMail.send(msg);
};
module.exports = {
  sendWelcomeEmail,
  sendQuitEmail,
  sendResetPassword
};
