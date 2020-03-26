const db = require('../database');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const ong = await db('ongs')
            .where('id', id)
            .select('name')
            .first();

        if (!ong) {
            return response.status(400).json({ error: `Ong with ID ${id} not found.` });
        }

        return response.json(ong);
    }
}