const crypto = require('crypto');
const db = require('../database');

module.exports = {
    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;
    
        const [id] = await db('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
    
        return response.json({ id });
    },

    async list(request, response) {
        const { page = 1 } = request.query;

        const [count] = await db('incidents')
            .count();

        const incidents = await db('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);

        response.header('X-Total.Count', count['count(*)']);

        return response.json(incidents);
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await db('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (!incident || incident.ong_id !== ong_id) {
            return response.status(401).json({ error: 'Operation not permitted.'});
        }

        await db('incidents').where('id', id).delete();

        return response.status(204).send();
    },
};