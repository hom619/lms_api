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
