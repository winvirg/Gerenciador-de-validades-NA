const express = require('express');
const cors = require('cors');

require('./services/alertaService');

const produtosRoutes =
    require('./routes/produtos');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/produtos', produtosRoutes);

const PORT = 3000;

app.listen(PORT, '0.0.0.0', () => {

    console.log(
        `Servidor rodando na porta ${PORT}`
    );
});