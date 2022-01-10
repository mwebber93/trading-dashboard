const express = require('express');
const ws = require('ws');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const { initialiseTradeRoutes } = require('./tradeService/routes');
const { initialiseTradeSimulator } = require('./tradeSimulator');

app.use(cors());
app.use(bodyParser.json());

// This is where we will store our mock data.
let mockData = [];

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

// Initialise web sockets
const wsPort = 4001;
const webSocketServer = new ws.Server({ port: wsPort });

webSocketServer.on('connection', (ws) => {
	ws.on('message', (msg) => {
		console.log('message received', msg);
	});

	ws.on('close', () => {
		console.log('websocket was closed');
	});
});

console.log(`Web socket server is running on port ${wsPort}...`);

// Initialise trade simulator.
initialiseTradeSimulator(webSocketServer, mockData);


