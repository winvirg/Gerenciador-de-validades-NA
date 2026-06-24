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

    const { email } =
        req.body;

    if(!email){

        return res.status(400).json({

            erro:
                'Email obrigatório'
        });
    }

    db.run(

        `INSERT INTO destinatarios
         (email)
         VALUES (?)`,

        [email],

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