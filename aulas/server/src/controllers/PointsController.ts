import knex from '../database/connection';
import { Request, Response } from 'express';

class PointsController {
    //Query Params: Paramêtros que vem na própria rota, geralmente opcionais, usados para filtrps, paginação, etc.
    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        const serializedPoints = points.map(point => {
            return {
                ...points,
                image_url: `http://192.168.1.233:3333/uploads/${point.image}`,
            };
        });

        return response.json(serializedPoints);
    }

    //Request Param: Parâmetrod que vem na própria rota uqe identificam um recurso
    async show(request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if (!point) {
            return response.status(400).json({ message: 'Point not found.' });
        }

        const serializedPoint = {
            ...point,
            image_url: `http://192.168.1.233:3333/uploads/${point.image}`,
        };

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('title');

        return response.json({ point: serializedPoint, items });
    }

    //Request Body: Parâmetros para criação/atualização de informações
    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;

        const trx = await knex.transaction(); //função para que evite que transações não sejam feitas se houve algum erro no processo geral

        const point = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        };

        const insertedIds = await trx('points').insert(point);

        const point_id = insertedIds[0];

        const pointItems = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((item_id: number) => {
                return {
                    item_id,
                    point_id,
                };
            });

        await trx('point_items').insert(pointItems);

        await trx.commit(); //serve para encerrar a transação para que, no caso, a inserção seja de fato feita

        return response.json({
            id: point_id,
            ...point
        });
    }
}

export default PointsController;