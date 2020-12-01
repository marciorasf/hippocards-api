import * as mailer from "nodemailer";
import * as sgTransport from "nodemailer-sendgrid-transport";

import { email_from, email_api_user, email_api_key, web_url } from "../config";

class MailService {
  options = {
    auth: {
      api_key: "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",
    },
  };

  client = mailer.createTransport(sgTransport(this.options));

  mountForgotPasswordEmail(userEmail: string, token: string) {
    const email = {
      from: email_from,
      to: userEmail,
      subject: "Flashcards: Password recovery",
      text: `
To change your password follow the link below, or paste it into your browser.

http://${web_url}/change-password/${token}

If you did not request this, please ignore this email.`,
    };

    return email;
  }

  async sendForgotPasswordEmail(userEmail: string, token: string) {
    return this.client.sendMail(this.mountForgotPasswordEmail(userEmail, token));
  }
}
export default new MailService();
