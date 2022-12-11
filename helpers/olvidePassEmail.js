import nodemailer from 'nodemailer';

const olvidePassEmail = async (datos) => {
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
        subject: "Reestablece tu contraseña",
        text: "Reestablece tu contraseña",
        html: `<p>Hola ${name}, has solicitado reestablecer tu contraseña.</p>
                <p>Hazlo a traves del siguiente enlace:</p>
                <a href="${process.env.FRONTEND_URL}/olvide-pass/${token}">Reestablecer Contraseña</a> `,
      })

      console.log("Mesaje enviado: %s", info.messageId);
}

export default olvidePassEmail;