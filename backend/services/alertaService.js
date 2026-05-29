const cron = require('node-cron');

const db =
    require('../database/db');

const {
    enviarEmail
} = require('./emailService');

function diasRestantes(data){

    const hoje = new Date();

    hoje.setHours(0,0,0,0);

    const validade =
        new Date(data);

    validade.setHours(0,0,0,0);

    return Math.ceil(
        (validade - hoje)
        / 86400000
    );
}

async function enviarAlertas(
    diasFiltro = null
){

    db.all(
        'SELECT * FROM produtos',
        [],
        async (err, produtos) => {

            if(err){

                console.error(err);

                return;
            }

            const alertas = {

                30: [],
                15: [],
                3: []
            };

            produtos.forEach(produto => {

                const dias =
                    diasRestantes(
                        produto.validade
                    );

                if(alertas[dias]){

                    alertas[dias].push(
                        produto
                    );
                }
            });

            const diasLista =
                diasFiltro
                ? [diasFiltro]
                : [30,15,3];

            for(const dias of diasLista){

                const lista =
                    alertas[dias];

                if(!lista || lista.length === 0){

                    console.log(
                        `Nenhum produto para ${dias} dias`
                    );

                    continue;
                }

                let html = `

                    <h2>
                        Produtos vencendo em ${dias} dias
                    </h2>

                    <table
                        border="1"
                        cellpadding="8"
                        cellspacing="0"
                        style="
                            border-collapse:collapse;
                            font-family:Arial;
                        "
                    >

                        <tr
                            style="
                                background:#0d2c8b;
                                color:white;
                            "
                        >

                            <th>Produto</th>
                            <th>Local</th>
                            <th>Qtd</th>
                            <th>Validade</th>

                        </tr>
                `;

                lista.forEach(p => {

                    html += `

                        <tr>

                            <td>${p.nome}</td>

                            <td>${p.local}</td>

                            <td>${p.qtd}</td>

                            <td>${p.validade}</td>

                        </tr>
                    `;
                });

                html += `
                    </table>

                    <br>

                    <small>
                        Sistema Gerenciador de Validades
                    </small>
                `;

                let destinatarios = [];

                if(dias === 30){

                    destinatarios = [

                        'gleidson.oliveira@nossoatacarejo.com.br',
                        'pisomn@nossoatacarejo.com.br',
                        'paulo17122023@gmail.com'
                    ];
                }

                if(dias === 15){

                    destinatarios = [

                        'gleidson.oliveira@nossoatacarejo.com.br',
                        'pisomn@nossoatacarejo.com.br',
                        'paulo17122023@gmail.com'
                    ];
                }

                if(dias === 3){

                    destinatarios = [
                        'gleidson.oliveira@nossoatacarejo.com.br',
                        'pisomn@nossoatacarejo.com.br',
                        'paulo17122023@gmail.com'
                    ];
                }

                await enviarEmail(

                    destinatarios,

                    `Alerta de Validade - ${dias} dias`,
                    html
                );

                console.log(
                    `Email de ${dias} dias enviado`
                );
            }
        }
    );
}

async function enviarAlertaManual(
    dias
){

    await enviarAlertas(
        dias
    );
}

cron.schedule(
    '0 8,14 * * *',
    () => {

        console.log(
            'Verificando alertas automáticos...'
        );

        enviarAlertas();
    }
);

module.exports = {

    enviarAlertas,

    enviarAlertaManual
};