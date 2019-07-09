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

<p>You can reset your password immediately by <a href="http://localhost:5000/change-password/${token}">clicking here</a> or pasting the following link in your browser:</p>
<p>http://localhost:5000/change-password/${token}</p>

<p>If you run into any other problems, drop us a line at help@quelquesminutes.com.</p>

Cheers,
    `
  };
  sgMail.send(msg);
};
const sendPasswordChanged = (email) => {
  const msg = {
    to: `${email}`,
    from: 'zencles75@gmail.com',
    subject: 'Success! Your password has been changed.',
    html: `
    <h1>You've got yourself a new password!</h1>
    <p>We just wanted to let you know that your password has been changed successfully. If you did not make this change, please <a href="http://localhost:5000/contact-us">let us know</a> as soon as possible. We will look into what's happened.</p>

    Cheers,
    `
  };
  sgMail.send(msg);
};
const sendEmailChanged = (email, newEmail) => {
  const msg = {
    to: `${email}`,
    from: 'zencles75@gmail.com',
    subject: 'Account QuelquesMinutes.org: Email address changed.',
    html: `
    <h1>Did you change your email address?</h1>
    <p>We noticed the email address for your QuelquesMinutes account was recently changed. If this was you, you can safely disregard this email.</p>
    <h2>Email address changed to: ${newEmail}</h2>

    <p>If you did not make this change, please <a href="http://localhost:5000/contact-us">let us know</a> as soon as possible. We will look into what's happened.</p>

    Thanks,
    `
  };
  sgMail.send(msg);
};
const sendToNewEmail = (email) => {
  const msg = {
    to: `${email}`,
    from: 'zencles75@gmail.com',
    subject: 'Success! Your Email has been changed.',
    html: `
    <p>To complete the process of changing your email address, you must confirm your new address below:</p>


    Thanks,
    `
  };
  sgMail.send(msg);
};
module.exports = {
  sendWelcomeEmail,
  sendQuitEmail,
  sendResetPassword,
  sendPasswordChanged,
  sendEmailChanged,
  sendToNewEmail
};
