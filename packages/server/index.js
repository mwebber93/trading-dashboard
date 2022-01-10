const express = require('express');
const moment = require('moment');
const uuid = require('uuid');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const { initialiseTradeRoutes } = require('./tradeService/routes');
const { initialiseTradeSimulator } = require('./tradeSimulator');
const { initialiseWSS } = require('./webSocketServer');

app.use(cors());
app.use(bodyParser.json());

// This is where we will store our mock data.
let mockData = {
	priceData: [],
	traderInfo: {
		cashAvailable: 1000,
		unitsHeld: 10,
		orders: [
			{
				id: uuid.v4(),
				type: 'buy',
				quantity: 3,
				price: 1000,
				triggered: true,
				succeeded: true,
				timestamp: moment().subtract(1, 'day').set({ milliseconds: 0, seconds: 0 }).valueOf(),
			},
		],
	},
};

// Initialise web socket server.
initialiseWSS();

// Initialise the routes of each service.
initialiseTradeRoutes(app, mockData);

// Initialise mock server.
const port = 4000;
app.listen(port, 'localhost', (err) => {
	if (err) {
		console.log(err);
		process.exit(-1);
	}
	console.log(`Mock server is running on port ${port}...`);
});

// Initialise trade simulator.
initialiseTradeSimulator(mockData);
