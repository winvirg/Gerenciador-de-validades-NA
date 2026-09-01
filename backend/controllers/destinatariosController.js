const db =
    require('../database/db');

exports.listar = (req, res) => {

    db.all(

        `SELECT *
         FROM destinatarios
         ORDER BY email`,

        [],

        (err, rows) => {

            if(err){

                return res.status(500).json({
                    erro: err.message
                });
            }

            res.json(rows);
        }
    );
};

exports.criar = (req, res) => {

    const { 
        email,
        alerta_crc,
        alerta_picking,
        alerta_pulmao
     } =
        req.body;

    if(!email){

        return res.status(400).json({

            erro:
                'Email obrigatório'
        });
    }

    db.run(

        `INSERT INTO destinatarios (

            email,

            alerta_crc,

            alerta_picking,

            alerta_pulmao

        )

        VALUES (?, ?, ?, ?)`,

        [
            email,
            alerta_crc,
            alerta_picking,
            alerta_pulmao
        ],

        function(err){

            if(err){

                return res.status(500).json({
                    erro: err.message
                });
            }

            res.json({

                id:
                    this.lastID,

                email
            });
        }
    );
};

exports.editar = (req, res) => {

    const { id } = req.params;

    const {

        alerta_crc,

        alerta_picking,

        alerta_pulmao

    } = req.body;

    db.run(

        `UPDATE destinatarios

        SET

            alerta_crc = ?,

            alerta_picking = ?,

            alerta_pulmao = ?

        WHERE id = ?`,

        [

            alerta_crc,

            alerta_picking,

            alerta_pulmao,

            id

        ],

        function(err){

            if(err){

                console.error(err);

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

exports.deletar = (req, res) => {

    db.run(

        `DELETE FROM destinatarios
         WHERE id = ?`,

        [req.params.id],

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