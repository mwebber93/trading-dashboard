const latestPricesController = require('./controllers/latestPricesController');

const initialiseTradeRoutes = (server, data) => {
	server.get('/prices', (req, res) => latestPricesController(req, res, data));
};

module.exports = { initialiseTradeRoutes };
