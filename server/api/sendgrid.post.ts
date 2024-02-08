import sgMail from '@sendgrid/mail';

sgMail.setApiKey('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');

export default async (req, res) => {
  const { name, message } = req.body;

  const msg = {
    to: 'konrad@mail.com', // zmień na swój adres e-mail
    from: 'weronika@wermoss.com', // zmień na swój adres e-mail
    subject: `Nowa wiadomość od ${name}`,
    text: message,
  };

  try {
    await sgMail.send(msg);
    res.status(200).end();
  } catch (error) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
    res.status(500).end();
  }
};
