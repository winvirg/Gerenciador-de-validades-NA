const db =
    require('../database/db');

const bcrypt =
    require('bcrypt');

const jwt =
    require('jsonwebtoken');

exports.login = (

    req,
    res

) => {

    const {

        user,
        pass

    } = req.body;

    db.get(

        `SELECT *
         FROM usuarios
         WHERE usuario = ?`,

        [user],

        async (err, usuario) => {

            if(err){

                return res
                    .status(500)
                    .json({

                        sucesso: false
                    });
            }

            if(!usuario){

                return res
                    .status(401)
                    .json({

                        sucesso: false
                    });
            }

            const senhaOk =
                await bcrypt.compare(

                    pass,

                    usuario.senha_hash
                );

            if(!senhaOk){

                return res
                    .status(401)
                    .json({

                        sucesso: false
                    });
            }

            const token =
                jwt.sign(

                    {

                        id:
                            usuario.id,

                        usuario:
                            usuario.usuario

                    },

                    'gerenciador-validades',

                    {

                        expiresIn:
                            '7d'
                    }
                );

            res.json({

                sucesso: true,

                token
            });
        }
    );
};