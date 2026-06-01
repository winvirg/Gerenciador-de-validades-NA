const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({

    service: 'gmail',

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function enviarEmail(
    destinatarios,
    assunto,
    html
){
    try {

        await transporter.sendMail({

            from: 'ti.moradanova@nossoatacarejo.com.br',

            to: destinatarios.join(','),

            subject: assunto,

            html
        });

        console.log(
            'Email enviado!'
        );

    } catch(err){

        console.error(
            'Erro ao enviar email:',
            err
        );
    }
}

module.exports = {
    enviarEmail
};