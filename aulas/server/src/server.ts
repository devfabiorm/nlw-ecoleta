import express, { response } from 'express';
import routes from './routes';

const app = express();

app.use(express.json()); //Serve para adicionar uma funcionalidade a aplicação
app.use(routes);

app.listen(3333);