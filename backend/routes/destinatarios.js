const express =
    require('express');

const router =
    express.Router();

const controller =
    require(
        '../controllers/destinatariosController'
    );

const auth =
    require(
        '../middleware/auth'
    );

router.get(
    '/',
    auth,
    controller.listar
);

router.post(
    '/',
    auth,
    controller.criar
);

router.put(

    '/:id',

    auth,

    controller.editar
);

router.delete(
    '/:id',
    auth,
    controller.deletar
);

module.exports =
    router;