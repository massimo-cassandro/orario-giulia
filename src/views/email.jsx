/*
  https://mailtrap.io/blog/react-send-email/
  https://nodemailer.com/about/

  https://lo-victoria.com/build-a-contact-form-with-react-and-nodemailer
  https://dev.to/jlong4223/how-to-implement-email-functionality-with-node-js-react-js-nodemailer-and-oauth2-2h7m
  https://javascript.plainenglish.io/sending-email-in-react-application-with-nodemailer-afcef6906608

  https://www.npmjs.com/package//nodemon

  https://medium.com/@patienceadajah/how-to-send-emails-from-a-react-application-without-a-backend-server-1dd8718ceedd


*/

import React from 'react';
import nodemailer from 'nodemailer';

// process.env.NODE_ENV

const transporter = nodemailer.createTransport({
  host: process.env.REACT_APP_MAILER_HOST,
  port: process.env.REACT_APP_MAILER_PORT,
  auth: {
    user: process.env.REACT_APP_MAILER_AUTH_USER,
    pass: process.env.REACT_APP_MAILER_AUTH_PWD
  }
});


class Email extends React.Component {
  componentDidMount() {
    document.querySelector('.sendMail').addEventListener('click', () => {
      // send mail
      let sent_mail = await transporter.sendMail({
        from: `"${process.env.REACT_APP_MAILER_FROM_NAME}" <${process.env.REACT_APP_MAILER_FROM_ADDR}>`, // sender address
        to: 'massimo.cassandro@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: document.getElementById('message-body').value, // plain text body
        // html: '<b>Hello world?</b>', // html body
      });

      console.log(sent_mail);

    }, false);
  }
  render() {

    return (
      <>
        <p className="text-center">Contattami</p>
        <textarea className="form-control" id="message-body" defaultValue="Prova" />
        <p><button type="button" className="btn sendMail">Invia</button></p>
      </>
    );
  }
}

export default Email;