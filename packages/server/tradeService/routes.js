const latestPricesController = require('./controllers/latestPricesController');
const positionController = require('./controllers/positionController');
const createOrderController = require('./controllers/createOrderController');
const listOrdersController = require('./controllers/listOrdersController');

const initialiseTradeRoutes = (server, data) => {
	server.get('/prices', (req, res) => latestPricesController(req, res, data));
	server.get('/position', (req, res) => positionController(req, res, data));
	server.post('/order', (req, res) => createOrderController(req, res, data));
	server.get('/orders', (req, res) => listOrdersController(req, res, data));
};

module.exports = { initialiseTradeRoutes };
