import express from 'express';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

//Rota: Endereço completo da requisição
//Recurso: Qual entidade estamos acessando no sistema

//GET: Buscar uma ou mais informações do backend
//POST: Criar uma nova informação no backend
//PUT: Atualizar uam informação existente no backend
//DELETE: Remover uma informação do backend

const routes = express.Router();

const pointsController = new PointsController();
const itemsController = new ItemsController();

//Padrões de nomes para métodos/funções: index => lista, show => exibit um registro, create => cadastrar, update => atualizar, delete => excluir
routes.get('/items', itemsController.index);

routes.post('/points', pointsController.create);

routes.get('/points', pointsController.index);

routes.get('/points/:id', pointsController.show);


export default routes;