import * as mailer from "nodemailer";

import { email_user, email_password, web_url } from "../config";

class MailService {
  origin = mailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: email_user,
      pass: email_password,
    },
  });

  mountForgotPasswordEmail(userEmail: string, token: string) {
    const emailConfig = {
      from: email_user,
      to: userEmail,
      subject: "Flashcards: Password recovery",
      text: `
To change your password follow the link below, or paste it into your browser.

http://${web_url}/change-password/${token}

If you did not request this, please ignore this email.`,
    };

    return emailConfig;
  }

  async sendForgotPasswordEmail(userEmail: string, token: string) {
    return this.origin.sendMail(this.mountForgotPasswordEmail(userEmail, token));
  }
}
export default new MailService();
