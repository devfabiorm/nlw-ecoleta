import express from 'express';

//Rota: Endereço completo da requisição
//Recurso: Qual entidade estamos acessando no sistema

//GET: Buscar uma ou mais informações do backend
//POST: Criar uma nova informação no backend
//PUT: Atualizar uam informação existente no backend
//DELETE: Remover uma informação do backend

const routes = express.Router();

routes.get('/', (request, response) => {
    return response.json({ message: 'Hello World'});
});

export default routes;

// //Query Params: Paramêtros que vem na própria rota, geralmente opcionais, usados para filtrps, paginação, etc.
// routes.get('/users', (request, response) => {
//     const search = String(request.query.search);

//    const filteredUsers = search ? users.filter(user => user.includes(search)) : users;

//     return response.json(filteredUsers);
// });

// //Request Param: Parâmetrod que vem na própria rota uqe identificam um recurso
// routes.get('/users/:id', (request, response) => {
//     const id = Number(request.params.id);

//     const user = users[id];

//     response.json(user);
// });

// //Request Body: Parâmetros para criação/atualização de informações
// routes.post('/users', (request, response) => {
//     const data = request.body;

//     console.log(data);

//     return response.json(data);
// });