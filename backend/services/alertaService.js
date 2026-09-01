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

function formatarData(data){

    console.log('formatarData executou:', data);

    const [
        ano,
        mes,
        dia
    ] = data.split('-');

    return `${dia}/${mes}/${ano}`;
}

async function enviarAlertas(
    diasFiltro = null,
    tipoFiltro = null
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

                PULMAO: {

                    30: [],
                    15: [],
                    3: []
                },

                PICKING: {

                    30: [],
                    15: [],
                    3: []
                },

                CRC: {

                    30: [],
                    15: [],
                    3: []
                }
            };

            produtos.forEach(produto => {

                const dias =
                    diasRestantes(
                        produto.validade
                    );

                const tipo =
                    produto.tipo || 'PULMAO';

                if(
                    alertas[tipo] &&
                    alertas[tipo][dias]
                ){

                    alertas[tipo][dias].push(
                        produto
                    );
                }
            });

            const diasLista =
                diasFiltro
                ? [diasFiltro]
                : [30,15,3];

const tipos =

    tipoFiltro

        ? [tipoFiltro]

        : [

            'PULMAO',

            'PICKING'
        ];

for(const tipo of tipos){

    for(const dias of diasLista){

        const lista =
            alertas[tipo][dias];

        if(!lista || lista.length === 0){

            console.log(
                `Nenhum produto ${tipo} para ${dias} dias`
            );

            continue;
        }

        let html = `

            <h2>
                Produtos do ${tipo} vencendo em ${dias} dias
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

                    ${tipo === 'CRC'
                        ? '<th>Recebimento</th>'
                        : ''
                    }

                    <th>Validade</th>

                </tr>
        `;

        lista.forEach(p => {

            html += `

                <tr>

                    <td>${p.nome}</td>

                    <td>${p.local}</td>

                    <td>${p.qtd}</td>

                    ${tipo === 'CRC'
                        ? `<td>${formatarData(p.recebido)}</td>`
                        : ''
                    }

                    <td>${formatarData(p.validade)}</td>

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

        const colunaAlerta = {

            CRC: 'alerta_crc',

            PICKING: 'alerta_picking',

            PULMAO: 'alerta_pulmao'

        }[tipo];

        db.all(

            `SELECT email
            FROM destinatarios
            WHERE ${colunaAlerta} = 1`,

            [],

            async (err, rows) => {

                if(err){

                    console.error(err);

                    return;
                }

                const destinatarios =

                    rows.map(
                        d => d.email
                    );

                if(destinatarios.length === 0){

                    console.log(

                        `Nenhum destinatário para ${tipo}`

                    );

                    return;
                }

                await enviarEmail(

                    destinatarios,

                    `Alerta ${tipo} - ${dias} dias`,

                    html
                );

                console.log(

                    `Email ${tipo} ${dias} dias enviado`

                );
            }
        );
    }
}

        }
    );
}

async function enviarAlertaManual(
    dias,
    tipo = null
){

    await enviarAlertas(
        dias,
        tipo
    );
}

// Pulmão + Picking

cron.schedule(

    '0 8,14 * * *',

    () => {

        console.log(
            'Alerta Pulmão/Picking'
        );

        enviarAlertas();
    }
);

// CRC

cron.schedule(

    '0 7,12 * * *',

    () => {

        console.log(
            'Alerta CRC'
        );

        enviarAlertas(
            null,
            'CRC'
        );
    }
);

cron.schedule(

    '40 9 * * *',

    () => {

        console.log(
            'Alerta CRC'
        );

        enviarAlertas(
            null,
            'CRC'
        );
    }
);

module.exports = {

    enviarAlertas,

    enviarAlertaManual
};