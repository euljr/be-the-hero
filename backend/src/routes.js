const express = require('express');
const OngController = require('./controllers/OngController');
const ProfileController = require('./controllers/ProfileController');
const IncidentController = require('./controllers/IncidentController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.list);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.list);

routes.get('/incidents', IncidentController.list);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;