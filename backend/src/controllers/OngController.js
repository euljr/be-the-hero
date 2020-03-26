const crypto = require('crypto');
const db = require('../database');

module.exports = {
    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;
    
        const id = crypto.randomBytes(4).toString('HEX');
    
        await db('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });
    
        return response.json({ id });
    },
    async list(request, response) {
        const ongs = await db('ongs').select('*');

        return response.json(ongs);
    },
};