require('dotenv').config();

const express =
    require('express');

const cors =
    require('cors');

const authRoutes =
    require('./routes/auth');

const produtosRoutes =
    require('./routes/produtos');

const destinatariosRoutes =
    require('./routes/destinatarios');

require('./services/alertaService');

const app =
    express();

app.use(cors());

app.use(
    express.json()
);

app.use(
    '/produtos',
    produtosRoutes
);

app.use(
    '/auth',
    authRoutes
);

app.use(
    '/destinatarios',
    destinatariosRoutes
);

const PORT = 3000;

app.listen(
    PORT,
    '0.0.0.0',
    () => {

        console.log(
            `Servidor rodando na porta ${PORT}`
        );
    }
);