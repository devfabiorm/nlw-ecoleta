import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import { celebrate, Joi } from 'celebrate';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

//Rota: Endereço completo da requisição
//Recurso: Qual entidade estamos acessando no sistema

//GET: Buscar uma ou mais informações do backend
//POST: Criar uma nova informação no backend
//PUT: Atualizar uam informação existente no backend
//DELETE: Remover uma informação do backend

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

//Padrões de nomes para métodos/funções: index => lista, show => exibit um registro, create => cadastrar, update => atualizar, delete => excluir
routes.get('/items', itemsController.index);

routes.get('/points', pointsController.index);

routes.get('/points/:id', pointsController.show);

routes.post(
    '/points',
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required()
        })
    }, {
        abortEarly: false
    }),
    pointsController.create);

export default routes;