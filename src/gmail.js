import nodemailer from 'nodemailer';
const { google } = require('googleapis');

// These id's and secrets should come from .env file, credits to https://youtu.be/-rcRf7yswfM?si=ldH5tUuJAC03bgyO for a walkthrough
const CLIENT_ID = CLIENT_ID;
const CLEINT_SECRET = 'CLIENT_SECRET';
// CLIENT_ID &  CLIENT_SECRET https://console.cloud.google.com/apis/credentials/oauthclient/
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = 'REFRESH_TOKEN'; // Can be found here https://developers.google.com/oauthplayground
const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLEINT_SECRET,
    REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export async function sendEmail(gmail, personA, personB) {
  const accessToken = await oAuth2Client.getAccessToken();
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: user,
      clientId: CLIENT_ID,
      clientSecret: CLEINT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken,
    }
  });

  const mailOptions = {
    from: user,
    to: personA.email,
    subject: 'Secret Santa',
    html: `<h2>Hello ${personA.name}</h2><p>You have been assigned to buy a gift 🎁 for ${personB.name} in this year's Secret Santa! 🎅🏻</p>`
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err);
    else
      console.log(info);
  });
}
