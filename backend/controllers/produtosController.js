const db =
    require('../database/db');

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

    db.run(

        `
        INSERT INTO produtos (
            nome,
            local,
            qtd,
            lote,
            status,
            validade,
            recebido
        )

        VALUES (?, ?, ?, ?, ?, ?, ?)
        `,

        [
            nome,
            local,
            qtd,
            lote,
            status,
            validade,
            recebido
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
            recebido = ?

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

                return res.status(500).json({
                    erro: err.message
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