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

  private mountRecoverPasswordEmail(userEmail: string, token: string) {
    const emailConfig = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "Flashcards: Password recovery",
      text: `http://localhost:3000/reset-password/${token}`,
    };

    console.log(process.env.EMAIL_USER);

    return emailConfig;
  }

  public async sendRecoverPasswordEmail(userEmail: string, token: string) {
    return this.origin.sendMail(this.mountRecoverPasswordEmail(userEmail, token));
  }
}
export default new MailService();
