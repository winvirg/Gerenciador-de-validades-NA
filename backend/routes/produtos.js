const express = require('express');

const router = express.Router();

const controller =
    require('../controllers/produtosController');

router.get(
    '/',
    controller.listar
);

router.get(
    '/teste-email/:dias',
    controller.testarEmail
);

router.post(
    '/',
    controller.criar
);

router.put(
    '/:id',
    controller.editar
);

router.delete(
    '/:id',
    controller.deletar
);

module.exports = router;