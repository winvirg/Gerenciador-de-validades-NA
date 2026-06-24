const nodemailer = require('nodemailer');

async function enviarEmail(
    destinatarios,
    assunto,
    html
){

    const transporter =
        nodemailer.createTransport({

            service: 'gmail',

            auth: {

                user:
                    process.env.EMAIL_USER,

                pass:
                    process.env.EMAIL_PASS
            }
        });

    try {

        await transporter.sendMail({

            from:
                process.env.EMAIL_USER,

            to:
                destinatarios.join(','),

            subject:
                assunto,

            html
        });

        console.log(
            'Email enviado!'
        );

        return true;

    } catch(err){

        console.error(
            'Erro ao enviar email:',
            err
        );

        throw err;
    }
}

module.exports = {
    enviarEmail
};