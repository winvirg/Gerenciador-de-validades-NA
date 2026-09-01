const db =
    require('../database/db');

function identificarTipo(local){

    if(!local)
        return 'PULMAO';

    const endereco =
        local
            .toUpperCase()
            .trim();

    if(
        endereco.startsWith('CRC')
    ){

        return 'CRC';
    }

    const partes =
        endereco.split('.');

    if(

        endereco.startsWith('V') &&

        partes.length >= 3 &&

        partes[2] === '1'

    ){

        return 'PICKING';
    }

    return 'PULMAO';
}

exports.listar = (req, res) => {

    db.all(
        'SELECT * FROM produtos',
        [],
        (err, rows) => {

            if(err){

                return res
                    .status(500)
                    .json(err);
            }

            res.json(rows);
        }
    );
};

exports.criar = (req, res) => {

    const {

        nome,
        local,
        qtd,
        lote,
        status,
        validade,
        recebido

    } = req.body;

    const tipo =
        identificarTipo(local);

    db.run(

        `
        INSERT INTO produtos (

            nome,
            local,
            qtd,
            lote,
            status,
            validade,
            recebido,
            tipo

        )

        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,

        [

            nome,
            local,
            qtd,
            lote,
            status,
            validade,
            recebido,
            tipo

        ],

        function(err){

            if(err){

                return res
                    .status(500)
                    .json(err);
            }

            res.json({

                id: this.lastID,

                sucesso: true
            });
        }
    );
};

exports.editar = (req, res) => {

    const { id } = req.params;

    const {

        nome,
        local,
        qtd,
        lote,
        status,
        validade,
        recebido

    } = req.body;

    const tipo =
        identificarTipo(local);

    db.run(

        `
        UPDATE produtos

        SET

            nome = ?,
            local = ?,
            qtd = ?,
            lote = ?,
            status = ?,
            validade = ?,
            recebido = ?,
            tipo = ?

        WHERE id = ?
        `,

        [

            nome,
            local,
            qtd,
            lote,
            status,
            validade,
            recebido,
            tipo,
            id

        ],

        err => {

            if(err){

                return res
                    .status(500)
                    .json(err);
            }

            res.json({
                sucesso: true
            });
        }
    );
};

exports.deletar = (req, res) => {

    const { id } = req.params;

    db.run(

        'DELETE FROM produtos WHERE id = ?',

        [id],

        err => {

            if(err){

                return res
                    .status(500)
                    .json(err);
            }

            res.json({
                sucesso: true
            });
        }
    );
};

exports.deletarTodos = (req, res) => {

    db.run(

        'DELETE FROM produtos',

        [],

        function(err){

            if(err){

                return res
                    .status(500)
                    .json({

                        erro:
                            err.message
                    });
            }

            res.json({
                sucesso: true
            });
        }
    );
};

const {
    enviarAlertaManual
} = require('../services/alertaService');

exports.testarEmail = async (
    req,
    res
) => {

    const dias =
        parseInt(
            req.params.dias
        );

    await enviarAlertaManual(
        dias
    );

    res.json({
        sucesso: true
    });
};