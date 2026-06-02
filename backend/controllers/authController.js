require('dotenv').config();

exports.login = (req, res) => {

    const {
        user,
        pass
    } = req.body;

    if(
        user === process.env.ADM_USER &&
        pass === process.env.ADM_PASS
    ){

        return res.json({

            sucesso: true,

            token:
                process.env.ADMIN_TOKEN
        });
    }

    res.status(401).json({

        sucesso: false
    });
};