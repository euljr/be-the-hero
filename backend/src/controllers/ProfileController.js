const db = require('../database');

module.exports = {
    async list(request, response) {
        const ong_id = request.headers.authorization;
        const incidents = await db('incidents')
            .where('ong_id', ong_id)
            .select('*');

        return response.json(incidents);
    },
};