import {
  passwordResetOTPTemplate,
  userActivatedNotification,
  userActivationEmail,
} from "./emailTemplate.js";
import { emailTransporter } from "./transport.js";

export const sendActivationEmail = async (obj) => {
  //get the transporter

  //get the template
  const transporter = emailTransporter();
  const info = await transporter.sendMail(userActivationEmail(obj));
  console.log(info.messageId);
  return info.messageId;
};
export const sendActivatedNotificationEmail = async (obj) => {
  //get the transporter

  //get the template
  const transporter = emailTransporter();
  const info = await transporter.sendMail(userActivatedNotification(obj));
  return info.messageId;
};

export const passwordResetOTPNotificationEmail = async (obj) => {
  //get the transporter
  const transporter = emailTransporter();
  //get the template
  const info = await transporter.sendMail(passwordResetOTPTemplate(obj));
  return info.messageId;
};
