import mailer from "nodemailer";

class MailService {
  origin = mailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  private mountForgotPasswordEmail(userEmail: string, token: string) {
    const emailConfig = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "Flashcards: Password recovery",
      text: `
To change your password follow the link below, or paste it into your browser.

http://${process.env.FRONT_URL}/change-password/${token}

If you did not request this, please ignore this email.`,
    };

    return emailConfig;
  }

  public async sendForgotPasswordEmail(userEmail: string, token: string) {
    return this.origin.sendMail(this.mountForgotPasswordEmail(userEmail, token));
  }
}
export default new MailService();
