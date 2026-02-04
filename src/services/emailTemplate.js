export const userActivationEmail = ({ email, name, url }) => {
  return {
    from: `"Library" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "Action Required - Activate your account.",
    text: `Welcome ${name}. Please click the link to activate your account
     ${url} `, // plain‑text body
    html: `<p>Welcome ${name}.
</p>
<br/>

<p>Your account has been created. Please <a href=${url}>click here</a> to activate your account.</p>
<br/>
<br/>
Thank you`, // HTML body
  };
};
export const userActivatedNotification = ({ email, name, url }) => {
  return {
    from: `"Library" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "Your account is now active.",
    text: `Hello ${name}! Your account has been activated. You may login now.`, // plain‑text body
    html: `<p>Hello ${name}!
</p>
<br/>

<p>Your account is ready to use. You may go and login now.</p>
<br/>
<br/>
Thank you`, // HTML body
  };
};
export const passwordResetOTPTemplate = ({ email, name, otp }) => {
  return {
    from: `"Library" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "Your OTP to reset the password.",
    text: `Dear ${name}! Your OTP to reset your password is ${otp}. This OTP expires in 5 minutes.`, // plain‑text body
    html: `<p>Hello ${name}!
</p>
<br/>

<p>Your OTP is ${otp}. You can use this OTP to reset your password now.</p>
<p>This OTP will expire in 5 minutes. </p>
<br/>
<br/>
Thank you`, // HTML body
  };
};
export const newPasswordResetNotificationTemplate = ({ email, name, otp }) => {
  return {
    from: `"Library" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "Your password has been changed.",
    text: `Dear ${name}! Your password has been updated successfully. If this wasn't you, please contact us immediately. `, // plain‑text body
    html: `<p>Dear ${name}!
</p>
<br/>

<p>Your password has been updated successfully.</p>
<p>If this wasn't you then please contact us immediately.</p>
<br/>
<br/>
Thank you`, // HTML body
  };
};
