import { userActivationEmail } from "./emailTemplate.js";
import { emailTransporter } from "./transport.js";

export const sendActivationEmail = async (obj) => {
  //get the transporter

  //get the template
  const transporter = emailTransporter();
  const info = await transporter.sendMail(userActivationEmail(obj));
  console.log(info.messageId);
  return info.messageId;
};
