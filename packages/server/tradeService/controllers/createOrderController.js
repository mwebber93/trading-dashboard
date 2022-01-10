const moment = require('moment');
const uuid = require('uuid');
const Validator = require('jsonschema').Validator;
const validator = new Validator();

const { broadcastMessage } = require('../../webSocketServer');
const { roundTo2DP } = require('../../helpers');
const { NEW_ORDER_MESSAGE } = require('../../constants');

const orderSchema = {
	id: '/order',
	type: 'object',
	properties: {
		type: { type: 'string' },
		quantity: { type: 'number' },
		price: { type: 'number' },
	},
	required: ['type', 'quantity', 'price'],
};

const createNewOrderController = (req, res, data) => {
	try {
		const { errors } = validator.validate(req.body, orderSchema);
		if (errors.length > 0) {
			res.status(400).jsonp({ message: errors[0].message });
		} else {
			const { type, quantity, price } = req.body;
			const newOrder = {
				id: uuid.v4(),
				type,
				quantity,
				price: roundTo2DP(price),
				triggered: false,
				succeeded: false,
				timestamp: moment().set({ milliseconds: 0, seconds: 0 }).valueOf(),
			};

			data.traderInfo.orders.push(newOrder);

			const broadcastData = {
				id: newOrder.id,
				type: newOrder.type,
				quantity: newOrder.quantity,
				price: newOrder.price,
			};
			// Broadcast new order.
			broadcastMessage(NEW_ORDER_MESSAGE, broadcastData);

			return res.status(200).jsonp({ message: 'OK' });
		}
	} catch (error) {
		console.error('internal server error', error);
		res.status(500).send();
	}
};

module.exports = createNewOrderController;
