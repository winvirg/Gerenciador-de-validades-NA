const jwt =
    require('jsonwebtoken');

module.exports = (

    req,
    res,
    next

) => {

    const token =
        req.headers.authorization;

    if(!token){

        return res
            .status(401)
            .json({

                sucesso: false,

                mensagem:
                    'Não autorizado'
            });
    }

    try {

        const usuario =
            jwt.verify(

                token,

                'gerenciador-validades'
            );

        req.usuario =
            usuario;

        next();

    } catch(err){

        return res
            .status(401)
            .json({

                sucesso: false,

                mensagem:
                    'Token inválido'
            });
    }
};