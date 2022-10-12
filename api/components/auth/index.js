const store = require('../../../store/dummy');
const Controller = require('./controller');

module.exports = Controller(store); //-> inyeccion de la base de datos