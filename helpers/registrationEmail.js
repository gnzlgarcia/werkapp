import nodemailer from 'nodemailer';

const registrationEmail = async (datos) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        }
      });

      const { email, name, token } = datos;

      //Enviar el email
      const info = await transporter.sendMail({
        from: "WerkApp - Gestión de Recursos Humanos",
        to: email,
        subject: "Comprueba tu cuenta en WerkApp",
        text: "Comprueba tu cuenta en WerkApp",
        html: `<p>Hola ${name}, comprueba tu cuenta en WerkApp.</p>
                <p>Hazlo a traves del siguiente enlace:</p>
                <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a> `,
      })

      console.log("Mesaje enviado: %s", info.messageId);
}

export default registrationEmail;