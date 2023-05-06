const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const client = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

app.post('/api/verify', (req, res) => {
  res.header('Content-Type', 'application/json');
  client.verify.v2.services(process.env.TWILIO_VERIFY_SID).verifications
    .create({
      to: req.body.to, 
      channel: 'sms'
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});

app.post('/api/verify-confirm', (req, res) => {
  res.header('Content-Type', 'application/json');
  client.verify.v2.services(process.env.TWILIO_VERIFY_SID).verificationChecks
    .create({
      to: req.body.to, 
      code: req.body.code
    })
    .then((verification_check) => {
      res.send(JSON.stringify({ status: verification_check.status }))
    })
    .catch(verification_check => {
      console.log(verification_check);
      res.send(JSON.stringify({ status: verification_check.status }));
    });
});

app.post('/api/messages', (req, res) => {
    res.header('Content-Type', 'application/json');
    client.messages
      .create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: req.body.to,
        body: req.body.body
      })
      .then(() => {
        res.send(JSON.stringify({ success: true }));
      })
      .catch(err => {
        console.log(err);
        res.send(JSON.stringify({ success: false }));
      });
  });

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);

