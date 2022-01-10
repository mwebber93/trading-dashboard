const ws = require('ws');
let wss;

const initialiseWSS = () => {
	const port = 4001;
	wss = new ws.Server({ port });
	wss.on('connection', (ws) => {
		ws.on('message', (msg) => {
			console.log('message received', msg);
		});

		ws.on('close', () => {
			console.log('websocket was closed');
		});
	});

	console.log(`Web socket server is running on port ${port}...`);
};

const broadcastMessage = (type, data) => {
	wss.clients.forEach((client) => {
		if (client.readyState === ws.OPEN) {
			client.send(
				JSON.stringify({
					type,
					data,
				})
			);
		}
	});
	console.log(`Broadcast for: ${type}.`);
};

module.exports = { broadcastMessage, initialiseWSS };
