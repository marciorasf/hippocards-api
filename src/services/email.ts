import { SES } from "aws-sdk";

import { __client_change_password_path__, __client_url__ } from "@config/client";
import { __ses_access_key_id__, __ses_region__, __ses_secret_access_key__ } from "@config/SES";

const mailer = new SES({
  credentials: {
    accessKeyId: __ses_access_key_id__,
    secretAccessKey: __ses_secret_access_key__,
  },
  region: __ses_region__,
});

const emailService = {
  async sendMail(toEmail: string, message: SES.Message): Promise<any> {
    return mailer
      .sendEmail({
        Source: `support@marciorasf.space`,
        Destination: {
          ToAddresses: [toEmail],
        },
        Message: message,
      })
      .promise();
  },

  async sendRecoverPasswordMail(email: string, token: string) {
    const message = {
      Subject: {
        Charset: "UTF-8",
        Data: "Recover your Hippocards password",
      },
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: `You can change your password at ${__client_url__}${__client_change_password_path__}${token}

          This link expires in 1 hour.`,
        },
      },
    };
    return this.sendMail(email, message);
  },
};

export default emailService;
