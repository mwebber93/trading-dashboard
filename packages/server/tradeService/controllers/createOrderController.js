const moment = require('moment');
const Validator = require('jsonschema').Validator;
const validator = new Validator();

const { roundTo2DP } = require('../../helpers');

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
			const { cashAvailable, orders, unitsHeld } = data.traderInfo;

			// Don't allow the trader to place a buy order they don't have the cash for. This includes any outstanding orders.
			const cashRequired =
				orders
					.filter((order) => !order.executed)
					.reduce((accumulator, order) => {
						return accumulator + roundTo2DP(order.price * order.quantity);
					}, 0) + roundTo2DP(quantity * price);
			// Don't allow the trader to oversell units. This includes any oustanding orders.
			const unitsRequired =
				orders
					.filter((order) => !order.executed)
					.reduce((accumulator, order) => {
						return accumulator + order.quantity;
					}, 0) + quantity;
			if (type === 'buy' && cashRequired > cashAvailable) {
				return res.status(400).jsonp({
					message: 'You have insufficient funds for this purchase.',
				});
			} else if (type === 'sell' && unitsRequired > unitsHeld) {
				return res.status(400).jsonp({
					message: 'You cannot sell more than you own.',
				});
			}

			data.traderInfo.orders.push({
				type,
				quantity,
				price,
				executed: false,
				timestamp: moment().set({ milliseconds: 0, seconds: 0 }).valueOf(),
			});

			return res.status(200).jsonp({ message: 'OK' });
		}
	} catch (error) {
		console.error('internal server error', error);
		res.status(500).send();
	}
};

module.exports = createNewOrderController;
