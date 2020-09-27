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

  private mountRecoverPasswordEmail({ userEmail, newPassword }) {
    const email = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "Flashcards: Password recovery",
      text: `Use this password to login into your account: ${newPassword}. You can change it after the login.`,
    };

    return email;
  }

  public async sendRecoverPasswordEmail({ userEmail, newPassword }) {
    return this.origin.sendMail(this.mountRecoverPasswordEmail({ userEmail, newPassword }));
  }
}
export default new MailService();
